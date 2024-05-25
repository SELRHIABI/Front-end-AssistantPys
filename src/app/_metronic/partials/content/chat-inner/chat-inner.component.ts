import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ChatService } from 'services/chat.service';

import { IMessage } from './message';
import { MessageReturn } from './messageReturn.model';
import { SharedService } from 'services/sharedService.service';

interface MessageModelRequest {
  user: number;
  text: string;
  time: string;
  template?: boolean;
}

interface MessageModelResponse {
  user: number;
  text: string;
  time: string;
  template?: boolean;
}

interface Message {
  message: string;
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

@Component({
  selector: 'app-chat-inner',
  templateUrl: './chat-inner.component.html',
})
export class ChatInnerComponent implements OnInit, OnDestroy {
  messages: IMessage[] = [];
  @Input() isDrawer: boolean = false;
  @Input() selectedThread: { id: number; threadId: string } | null = null;

  @HostBinding('class') class = 'card-body';
  @HostBinding('id') id = this.isDrawer
    ? 'kt_drawer_chat_messenger_body'
    : 'kt_chat_messenger_body';
  @ViewChild('messageInput', { static: true })
  messageInput!: ElementRef<HTMLTextAreaElement>;

  private messagesRequest$: BehaviorSubject<Array<MessageModelRequest>> = new BehaviorSubject<Array<MessageModelRequest>>([]);
  messagesObsRequest: Observable<Array<MessageModelRequest>> = this.messagesRequest$.asObservable();

  private messagesResponse$: BehaviorSubject<Array<MessageModelResponse>> = new BehaviorSubject<Array<MessageModelResponse>>([]);
  messagesObsResponse: Observable<Array<MessageModelResponse>> = this.messagesResponse$.asObservable();

  selectedThreadSubscription!: Subscription;

  constructor(private chatService: ChatService, private sharedService: SharedService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.selectedThreadSubscription = this.sharedService.selectedThread$.subscribe(thread => {
      if (thread) {
        console.log('Received Thread ID:', thread.id, 'Thread ID:', thread.threadId); // Debug log
        this.selectedThread = thread;
        this.fetchMessages(thread.id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.selectedThreadSubscription) {
      this.selectedThreadSubscription.unsubscribe();
    }
  }

  fetchMessages(threadId: number): void {
    if (!threadId) {
      console.error('Thread ID is not defined.');
      return;
    }

    console.log('Fetching messages for thread ID:', threadId); // Debug log
    this.chatService.getMessages(threadId).subscribe((messages: IMessage[]) => {
      this.messages = messages;
      this.cdr.detectChanges();
    });
  }

  submitMessage(): void {
    if (!this.selectedThread) {
      console.error('No thread selected.');
      return;
    }

    const text = this.messageInput.nativeElement.value;

    const newMessageRequest: MessageModel = {
      id: 0,
      response: '',
      message: text,
      user: Number(localStorage.getItem('idThreadNumber')),
      type: 'in',
      text: '',
      time: '',
      template: true,
    };

    console.log('the request that the component sends ', newMessageRequest.user);
    this.sendMessage(newMessageRequest);
    console.log('what is sent to the server ');

    // Auto answer
    setTimeout(() => {
      this.addMessage({
        id: 0,
        message:'',
        response: 'Thank you for your awesome support!',


      });
    }, 4000);

    // Clear input
    this.messageInput.nativeElement.value = '';
    this.fetchMessages(this.selectedThread.id);
    this.cdr.detectChanges();
  }

  addMessage(newMessage: IMessage): void {
    const messages = [...this.messages];
    messages.push(newMessage);
    this.messages = messages;
    this.cdr.detectChanges();
  }

  sendMessage(messagemodel: MessageModel): void {
    if (!this.selectedThread) {
      console.error('No thread selected.');
      return;
    }

    // Store the observable returned by the sendMessage method
    const messageObservable = this.chatService.sendMessage(this.selectedThread.threadId, messagemodel);

    // Subscribe to the observable to handle the response
    messageObservable.subscribe(
      response => {
        // Handle the successful response
        console.log('Message sent successfully:', response);
        this.fetchMessages(this.selectedThread!.id);
      },
      error => {
        // Handle any errors
        console.error('Error sending message:', error);
      }
    );
  }

  getUser(user: number): UserInfoModel {
    return defaultUserInfos[user];
  }
}
