import { ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit, Output  } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { IChatMessage } from './private-chat';
import { ThreadChatDataService } from 'services/thread-chat-data.service';
import { SharedService } from 'services/sharedService.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-private-chat',
   templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent implements OnInit {
  data: any;
  @HostBinding('class') class = 'd-flex flex-column flex-lg-row';

  ////////
  @Output() threadSelected = new EventEmitter<{ id: number, threadId: string }>();


  selectedId: number;
  selectedThreadId: string;
  threadSubscription: Subscription;
  
  constructor(private threadchatdata: ThreadChatDataService,private sharedService:SharedService, private cdr: ChangeDetectorRef) {
    this.getData();
  }

  ngOnInit(): void {
    this.getData();

  }


  getData(){

    this.threadchatdata.getData().subscribe((data: IChatMessage) => {
      this.data = data;
      this.cdr.detectChanges();

    });
  }
  selectItem(item: any) {
    const selectedThread = { id: item.id, threadId: item.threadId };
    this.selectedId = item.id;
    this.selectedThreadId = item.threadId; 
    localStorage.setItem('threadId',this.selectedThreadId);
    localStorage.setItem('idThreadNumber',this.selectedId.toString());
    console.log('Selected ID:', this.selectedId);
    console.log('Selected Thread ID:', this.selectedThreadId);
    // Use the shared service to notify about the selected thread
    this.sharedService.selectThread(selectedThread);
  }
  onCreateThread(): void {
    this.threadchatdata.createThread().subscribe(
      response => {
        console.log('Thread created successfully', response);
        // Mettez à jour les données ici si nécessaire, par exemple :
        this.getData();
      },
      error => {
        console.error('Error creating thread', error);
      }
    );
  }





}
