import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/_metronic/partials/content/chat-inner/message';
import { MessageReturn } from 'src/app/_metronic/partials/content/chat-inner/messageReturn.model';

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

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiChat = 'http://localhost:8081/api/v1/Chat'; // Update with your API URL
  private apiAssistant = 'http://localhost:8081/api/v1/assistante'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getMessages(threadId: number): Observable<IMessage[]> {
    console.log("Fetching messages for thread ID:", threadId);
    return this.http.get<IMessage[]>(`${this.apiChat}/chat/${threadId}`);
  }

  sendMessage(threadId: string, message: MessageModel): Observable<MessageReturn> {
    console.log("Sending message:", message, "to thread ID:", threadId);
    return this.http.post<MessageReturn>(`${this.apiAssistant}/sendMessage/${threadId}`, message);
  }
}
