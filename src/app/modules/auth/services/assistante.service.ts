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

export type UserType = UserModel | undefined;
 

///this service represents my assistant controller 
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'http://localhost:8081/api/v1/assistant'; // Change this to your actual backend URL

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

  // public methods
  sendMessage(message: UserMessage, threadId: string): Observable<ResponseMessage> {
    this.request = message; // Store the request message
    return this.http.post<ResponseMessage>(`${this.baseUrl}/sendMessage/${threadId}`, message).pipe(
      tap(response => {
        this.response = response; // Store the response message
      })
    );
 }

    getMessages(threadId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/messages/${threadId}`);
    }
    /////the userId is stored in the localStorage of the browser
    createThread(userId: number): void {
      let responseCreatedThread : Observable<ThreadModel>= this.http.post<ThreadModel>(`${this.baseUrl}/useId/${userId}/createThread`, {}).pipe(
        tap(thread => {
          this.threadId = thread.threadID; // Store the created thread
        })
      );  
 }
    
}
