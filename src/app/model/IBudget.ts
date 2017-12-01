import { ICategory } from "../model/ICategory";

export class IBudget {

  budgetId: number;
  budgetName: string;
  projected: number;
  actual: number;
  periodon: string;
  createDate: string;
  category: ICategory;
  clear(){
    this.budgetId=null;
    this.budgetName="";
    this.budgetName=null;
    this.projected=null;
    this.periodon="";
    this.createDate="";
    this.category=null;
}
}