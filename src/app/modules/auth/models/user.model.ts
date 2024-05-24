import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id?: number;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;

  constructor() {
    super();
    this.email = '';
    this.password = '';
  }

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.email = user.email || '';
    this.password = user.password || '';
    this.firstname = user.firstname;
    this.lastname = user.lastname;
  }
}
