import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from 'services/chat.service';

interface MessageModelRequest {
  user: number;
  type: 'in' ;
  text: string;
  time: string;
  template?: boolean;
}

interface MessageModelResponse {
  user: number;
  type: 'out';
  text: string;
  time: string;
  template?: boolean;
}

interface MessageDto {
  id: number;
  message: string;
  response: string;
}

interface UserInfoModel {
  initials?: {
    label: string;
    state: 'warning' | 'danger' | 'primary' | 'success' | 'info';
  };
  name: string;
  avatar?: string;
  email: string;
  position: string;
  online: boolean;
}

const defaultUserInfos: Array<UserInfoModel> = [
  // ... Your user info data
];

@Component({
  selector: 'app-chat-inner',
  templateUrl: './chat-inner.component.html',
})
export class ChatInnerComponent implements OnInit {
  @Input() isDrawer: boolean = false;
  @HostBinding('class') class = 'card-body';
  @HostBinding('id') id = this.isDrawer
    ? 'kt_drawer_chat_messenger_body'
    : 'kt_chat_messenger_body';
  @ViewChild('messageInput', { static: true })
  messageInput: ElementRef<HTMLTextAreaElement>;

  private messagesRequest$: BehaviorSubject<Array<MessageModelRequest>> = new BehaviorSubject<Array<MessageModelRequest>>([]);
  messagesObsRequest: Observable<Array<MessageModelRequest>> = this.messagesRequest$.asObservable();

  private messagesResponse$: BehaviorSubject<Array<MessageModelResponse>> = new BehaviorSubject<Array<MessageModelResponse>>([]);
  messagesObsResponse: Observable<Array<MessageModelResponse>> = this.messagesResponse$.asObservable();

  constructor(private chatService: ChatService) {} // Inject the service

  ngOnInit(): void {
    this.fetchMessages(); // Assuming you pass the threadId here, update accordingly
  }

  fetchMessages(): void {
    this.chatService.getMessages().subscribe((messages: MessageDto[]) => {
      let newRequestMessages: Array<MessageModelRequest> = [];
      let newResponseMessages: Array<MessageModelResponse> = [];

      messages.forEach((message: MessageDto) => {
        console.log(message);
        if (message.message) {
          newRequestMessages.push({
            user: 1, // Assuming user '1' is the sender for incoming messages
            type: 'in',
            text: message.message,
            time: 'Some timestamp', // Replace with actual timestamp or add a time field in MessageDto
          });
        }
        if (message.response) {
          console.log(message.response);  
          newResponseMessages.push({
            user: 2, // Assuming user '2' is the responder for outgoing messages
            type: 'out',
            text: message.response,
            time: 'Some timestamp', // Replace with actual timestamp or add a time field in MessageDto
          });
        }
      });

      this.messagesRequest$.next(newRequestMessages);
      this.messagesResponse$.next(newResponseMessages);
    });
  }

  submitMessage(): void {
    const text = this.messageInput.nativeElement.value;
    const newMessage: MessageModelResponse= {
      user: 2,
      type: 'out',
      text,
      time: Date(),
    };

    // this.addMessage();
    
    // auto answer
    setTimeout(() => {
      this.addMessage({
        user: 4,
        type: 'in',
        text: 'Thank you for your awesome support!',
        time: Date(),
      });
    }, 4000);
    // clear input
    this.messageInput.nativeElement.value = '';
  }

  addMessage(newMessage: MessageModelRequest): void {
    const messages = [...this.messagesRequest$.value];
    messages.push(newMessage);
    this.messagesRequest$.next(messages);
  }

  getUser(user: number): UserInfoModel {
    return defaultUserInfos[user];
  }

  getMessageCssClass(message: MessageModelRequest): string {
    return `p-5 rounded text-dark fw-bold mw-lg-400px bg-light-${
      message.type === 'in' ? 'info' : 'primary'
    } text-${message.type === 'in' ? 'start' : 'end'}`;
  }
}
