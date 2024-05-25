import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface MessageModel {
  id: number;
  response: string;
  message: string;
  user: number;
  type: 'in' | 'out';
  text: string;
  time: string;
  template?: boolean;
}

interface MessageModel {
  user: number;
  type: 'in' | 'out';
  text: string;
  time: string; // Update the type to Date
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8081/api/v1/Chat'; // Update with your API URL
  idThread: string = 'thread_SIPAWXKEF6KQaoKNU7MrfZxg';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<MessageModel[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat/${1}`).pipe(
      map((response: any) => response.map((interaction: any) => ({
        user: interaction.userId, // Adjust according to your API response
        type: interaction.type, // Assuming you have 'type' in your response
        text: interaction.message,
        time: interaction.createdAt
      }))),
      tap((messages: MessageModel[]) => {
        console.log(messages);
      })
    );
  }
  sendMessage(message: MessageModel): Observable<MessageModel> {
    return this.http.post<MessageModel>(`${this.apiUrl}/messages`, message);
  }
}
