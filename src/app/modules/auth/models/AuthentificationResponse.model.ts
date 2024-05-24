import { AuthModel } from './auth.model';

export class AuthentificationResponse extends AuthModel {

  id?: number;

  constructor() {
    super();
    this.id = 0;
  }

  setAuthResponse(_user: unknown) {
    const response = _user as AuthentificationResponse;
    this.id = response.id;
  }

}
