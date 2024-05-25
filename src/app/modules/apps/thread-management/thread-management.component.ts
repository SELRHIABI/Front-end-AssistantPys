import { Component, OnInit } from '@angular/core';
import { ThreadModelDto } from '../../auth/models/ThreadModelDto.model';
import { ChatService } from '../../auth/services/assistante.service';
import { ThreadDtoService } from '../../auth/services/modelThreadService.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-thread-management',
  templateUrl: './thread-management.component.html',
  styleUrls: ['./thread-management.component.scss']
})
export class ThreadManagementComponent implements OnInit {
  
  threads: ThreadModelDto[] = [];
  userId: number;

  constructor(private threadDtoService: ThreadDtoService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.loadThreads();
    }
  }

  loadThreads(): void {
    this.threadDtoService.getAllThreads(this.userId).subscribe(threads => {
      this.threads = threads;
    });
  }

  createThread(): void {
    return this.chatService.createThread(this.userId);
    
  }

  deleteThread(threadId: number): void {
    this.threadDtoService.deleteThread(threadId).subscribe(() => {
      this.threads = this.threads.filter(thread => thread.id !== threadId);
    });
  }
}






