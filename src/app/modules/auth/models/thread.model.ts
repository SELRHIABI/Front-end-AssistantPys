
export class ThreadModel {

    threadID: string;
    status: string
    constructor() {
      this.threadID = '';
    }
  
    setUserMessage(_user: unknown) {
      const user = _user as ThreadModel;
      this.threadID = user.threadID;
      this.status=user.status;
    }
  }