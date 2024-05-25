import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThreadModel } from '../models/thread.model';
import { ThreadModelDto } from '../models/ThreadModelDto.model';

@Injectable({
  providedIn: 'root',
})
export class ThreadDtoService {
  private baseUrl = 'http://localhost:8081/api/v1/threads'; // Change this to your actual backend URL

  private threadsSubject = new BehaviorSubject<ThreadModel[]>([]);
  public threads$ = this.threadsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllThreads(userId: number): Observable<ThreadModelDto[]> {
    return this.http.get<ThreadModelDto[]>(`${this.baseUrl}/${userId}`);
  }

  setThreads(threads: ThreadModel[]): void {
    this.threadsSubject.next(threads);
  }
}
