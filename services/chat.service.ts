import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

// interface MessageModel {
//   user: number;
//   type: 'in' | 'out';
//   text: string;
//   time: string; // Update the type to Date
// }



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiChat = 'http://localhost:8081/api/v1/Chat'; // Update with your API URL
  private apiAssistant = 'http://localhost:8081/api/v1/assistante'; // Update with your API URL

  idThread: string = 'thread_cvz4gWLWb7S5UWqspyi4sB4G';

  constructor(private http: HttpClient) {}

  // getMessages(): Observable<MessageModel[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/chat/${1}`).pipe(
  //     map((response: any) => response.map((interaction: any) => ({
  //       user: interaction.userId, // Adjust according to your API response
  //       type: interaction.type, // Assuming you have 'type' in your response
  //       text: interaction.message,
  //       time: interaction.createdAt
  //     }))),
  //     tap((messages: MessageModel[]) => {
  //       console.log(messages);
  //     })
  //   );
  // }

  getMessages(){
    return this.http.get<IMessage>(`${this.apiChat}/chat/${3}`);
  }

  sendMessage(message: MessageModel): Observable<MessageReturn> {
    console.log("im in the sendMessage for this message:",message)
    return this.http.post<MessageReturn>(`${this.apiAssistant}/sendMessage/${this.idThread}`, message);
  }

}
