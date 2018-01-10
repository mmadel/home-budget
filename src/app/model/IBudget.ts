import { ICategory } from "../model/ICategory";

export class IBudget {

  _id: number;
  budgetName: string;
  projected: number;
  actual: number;
  periodon: string;
  createDate: string;
  category: ICategory;
  UName : string;
  clear(){
    this._id=null;
    this.budgetName="";
    this.budgetName=null;
    this.projected=null;
    this.periodon="";
    this.createDate="";
    this.category=null;
}
}