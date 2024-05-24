import { AuthModel } from './auth.model';

export class AuthentificationResponse extends AuthModel {
  id: number;
  token: string; // Assuming response has a token field

  constructor() {
    super();
    this.id = 0;
    this.token = '';
  }

  setAuthResponse(response: any) {
    this.id = response.id;
    this.authToken = response.token; // Mapping the token to authToken
  }
}
