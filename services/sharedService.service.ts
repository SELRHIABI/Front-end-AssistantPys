import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedThreadSource = new BehaviorSubject<{ id: number, threadId: string } | null>(null);
  selectedThread$ = this.selectedThreadSource.asObservable();

  selectThread(thread: { id: number, threadId: string } | null) {
    this.selectedThreadSource.next(thread);
  }
}
