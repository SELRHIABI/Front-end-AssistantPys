import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChatMessage } from 'src/app/modules/apps/chat/private-chat/private-chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadChatDataService {
  private baseUrl = 'http://localhost:8081/api/v1/threads'; 
  private url1='http://localhost:8081/api/v1/assistante'
  // add http client to the constructor
  constructor(private http: HttpClient) { }

  id: number = Number(localStorage.getItem('idUser'));

  //  method that will get the threads from the server
  getData(){
    console.log("the threads of the id's User :",this.id)
    return this.http.get<IChatMessage>(`${this.baseUrl}/${this.id}`);
  }
  createThread(): Observable<any> {
    return this.http.post<any>(`${this.url1}/useId/${this.id}/createThread`,null);
  }

}

