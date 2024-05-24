import { AuthModel } from './auth.model';

export class AuthentificationResponse extends AuthModel {

  id?: number;

  constructor() {
    super();
    this.id = 0;
  }

  setAuthResponse(response: AuthentificationResponse) {
    this.id = response.id;
    this.setAuth(response);
  }

}
