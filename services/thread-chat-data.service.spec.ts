import { TestBed } from '@angular/core/testing';

import { ThreadChatDataService } from './thread-chat-data.service';

describe('ThreadChatDataService', () => {
  let service: ThreadChatDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadChatDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
