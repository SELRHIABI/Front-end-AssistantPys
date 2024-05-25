import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from 'services/chat.service';

interface MessageModel {
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

  private messages$: BehaviorSubject<Array<MessageModel>> = new BehaviorSubject<Array<MessageModel>>([]);
  messagesObs: Observable<Array<MessageModel>> = this.messages$.asObservable();

  constructor(private chatService: ChatService) {} // Inject the service

  ngOnInit(): void {
    this.fetchMessages(''); // Assuming you pass the threadId here, update accordingly
  }

  fetchMessages(threadId: string): void {
    this.chatService.getMessages().subscribe(messages => {
      let newMessages: Array<MessageModel> = [];
      messages.forEach(message => {
        newMessages.push({
          user: message.user,
          type: message.type,
          text: message.text,
          time: message.time,
        });
      });
    
      this.messages$.next(newMessages);
    });
  }

  submitMessage(): void {
    const text = this.messageInput.nativeElement.value;
    const newMessage: MessageModel = {
      user: 2,
      type: 'out',
      text,
      time: Date(),
    };
    this.addMessage(newMessage);
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

  addMessage(newMessage: MessageModel): void {
    const messages = [...this.messages$.value];
    messages.push(newMessage);
    this.messages$.next(messages);
  }

  getUser(user: number): UserInfoModel {
    return defaultUserInfos[user];
  }

  getMessageCssClass(message: MessageModel): string {
    return `p-5 rounded text-dark fw-bold mw-lg-400px bg-light-${
      message.type === 'in' ? 'info' : 'primary'
    } text-${message.type === 'in' ? 'start' : 'end'}`;
  }
}
