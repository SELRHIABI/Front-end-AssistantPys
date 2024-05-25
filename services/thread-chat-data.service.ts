import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChatMessage } from 'src/app/modules/apps/chat/private-chat/private-chat';

@Injectable({
  providedIn: 'root'
})
export class ThreadChatDataService {
  private baseUrl = 'http://localhost:8081/api/v1/threads'; 
  // add http client to the constructor
  constructor(private http: HttpClient) { }

  id: number = Number(localStorage.getItem('id'));
  // create a method that will get the data from the server
  getData( ){
    return this.http.get<IChatMessage>(`${this.baseUrl}/${this.id}`);
  }

}

// the commande to generate this service is : ng generate service services/servaceName
// then you have to go to the component where you want to use this service and inject it in the constructor xxx.component.ts
