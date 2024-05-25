import { Component, HostBinding, OnInit  } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { IChatMessage } from './private-chat';
import { ThreadChatDataService } from 'services/thread-chat-data.service';


@Component({
  selector: 'app-private-chat',
   templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss'],
})
export class PrivateChatComponent implements OnInit {
  data: any;
  @HostBinding('class') class = 'd-flex flex-column flex-lg-row';


  // inject the service in the constructor by adding it as a parameter in the constructor like in this example we add private threadchatdata: ThreadChatDataService
  // then we call the getData method from the service in the ngOnInit method
  constructor(private threadchatdata: ThreadChatDataService) {
    this.getData();
  }

  ngOnInit(): void {
    this.getData();
  }


  // you have to create a function that call the getDate from the service : serviceName.methodName
  getData(){

    this.threadchatdata.getData().subscribe((data: IChatMessage) => {

      // intializate the binding param you define above; 
      this.data = data;
    });
  }

}
