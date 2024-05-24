
export class ThreadModelDto {
    id:number;
    threadID: string;
    title:string;
    idUser: number
    constructor() {
        this.id = 0;
        this.threadID = '';
        this.title = '';
        this.idUser = 0;
    }
  
    setUserMessage(_user: unknown) {
      const user = _user as ThreadModelDto;
      this.id = user.id;
        this.threadID = user.threadID;
        this.title = user.title;
        this.idUser = user.idUser;
    }


    ///// the id and id user should not be fetched
  }