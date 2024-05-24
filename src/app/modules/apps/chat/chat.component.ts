import { Component, OnInit } from '@angular/core';
import { ThreadDtoService } from '../../auth/services/modelThreadService.service';
import { ThreadModel } from '../../auth/models/thread.model';
import { ThreadModelDto } from '../../auth/models/ThreadModelDto.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  threads: ThreadModel[] = [];
  private userId: number;

  constructor(private threadDtoService: ThreadDtoService) {
    // Assume userId is stored in localStorage
    this.userId = +localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.fetchThreads();
  }

  fetchThreads(): void {
    this.threadDtoService.getAllThreads(this.userId).subscribe(
      (data: ThreadModelDto[]) => {
        this.threads = data.map(dto => {
          const thread = new ThreadModel();
          thread.threadID = dto.threadID;
          thread.status = 'active'; // Assuming a default status
          return thread;
        });
      },
      (error) => {
        console.error('Error fetching threads', error);
      }
    );
  }
}
