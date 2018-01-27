export class User{
    _id: number;
    userName: string;
    password: string;
    email : string;
    token :string;
    clear(){
        this._id=null;
        this.userName="";
        this.password="";
        this.email="";
    }
}