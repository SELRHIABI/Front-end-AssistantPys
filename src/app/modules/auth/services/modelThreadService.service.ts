import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthentificationResponse } from '../models/AuthentificationResponse.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserMessage } from '../models/userMessage.model';
import { ResponseMessage } from '../models/responseMessage.model';
import { ThreadModel } from '../models/address.model';
import { ThreadModelDto } from '../models/ThreadModelDto.model';

export type UserType = UserModel | undefined;
 

///this service represents my assistant controller  theres is get to return my list of thread for each user and delete thread
@Injectable({
  providedIn: 'root',
})
export class ThreadDtoService {
  private baseUrl = 'http://localhost:8081/api/v1/threads'; // Change this to your actual backend URL

  // private fields
  public response: ResponseMessage;
  public request:UserMessage;
  public threadId:string;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private http: HttpClient,  // Add this line
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
  }
  
/////the userId is stored in the localStorage of the browser

  getAllThreads(userId: number): Observable<ThreadModelDto[]> {
    return this.http.get<ThreadModelDto[]>(`${this.baseUrl}/${userId}`);
  }

  deleteThread(threadId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${threadId}`);
  }
    
}