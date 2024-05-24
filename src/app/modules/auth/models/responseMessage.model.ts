
export class ResponseMessage {

    message: string;
    status: string
    constructor() {
      this.message = '';
    }
  
    setUserMessage(_user: unknown) {
      const user = _user as ResponseMessage;
      this.message = user.message;
      this.status=user.message;
    }
  }