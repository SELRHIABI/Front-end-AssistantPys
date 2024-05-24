
export class UserMessage {

  message: string;

  constructor() {
    this.message = '';
  }

  setUserMessage(_user: unknown) {
    const user = _user as UserMessage;
    this.message = user.message;
  }
}