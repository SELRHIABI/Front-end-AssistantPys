import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from 'services/chat.service';
import { IMessage } from './message';
import { MessageReturn } from './messageReturn.model';
interface MessageModelRequest {
  user: number;
  text: string;
  time: string;
  template?: boolean;
}

interface MessageModelResponse {
  user: number;
  // type: 'out';
  text: string;
  time: string;
  template?: boolean;
}

interface Message {
  message:string
}

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
returnInteraction: MessageReturn

@Component({
  selector: 'app-chat-inner',
  templateUrl: './chat-inner.component.html',
})
export class ChatInnerComponent implements OnInit {
  messages: any;
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

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {
    this.fetchMessages();
  } // Inject the service

  ngOnInit(): void {
    this.fetchMessages(); // Assuming you pass the threadId here, update accordingly
  }

  fetchMessages(){
    this.chatService.getMessages().subscribe((messages: IMessage) => {
      this.messages = messages;
      this.cdr.detectChanges();
    });
  }

  submitMessage(): void {
    const text = this.messageInput.nativeElement.value;
    
    const newMessageResponse: MessageModelResponse= {
      user: 2,
      // type: 'out',
      text,
      time: Date(),
    };

    const newMessageRequest: MessageModel= {
      id: 0,
      response: '',
      message: text,
      user: Number(localStorage.getItem("idUser")),
      type: 'in' ,
      text: '',
      time: '' ,
      template: true
    };
    const sendedMessage:Message={
      message:text
    }

    
    console.log("the request that the component send ",newMessageRequest)
    this.sendMessage(newMessageRequest);
    console.log("what is sended to the server ")
    
    // auto answer
    setTimeout(() => {
      this.addMessage({
        user: 4,
        text: 'Thank you for your awesome support!',
        time: Date(),
      });
    }, 4000);
    // clear input
    this.messageInput.nativeElement.value = '';
    this.fetchMessages();
    this.cdr.detectChanges();
  }

  addMessage(newMessage: MessageModelRequest): void {
    const messages = [...this.messagesRequest$.value];
    messages.push(newMessage);
    this.messagesRequest$.next(messages);
  }

  getUser(user: number): UserInfoModel {
    return defaultUserInfos[user];
  }
  sendMessage(messagemodel:MessageModel) {
    // Store the observable returned by the sendMessage method
    const messageObservable = this.chatService.sendMessage(messagemodel);

    // Subscribe to the observable to handle the response
    messageObservable.subscribe(
      response => {
        // Handle the successful response
        console.log('Message sent successfully:', response);
        this.fetchMessages();
      },
      error => {
        // Handle any errors
        console.error('Error sending message:', error);
      }
    );
  }
}
