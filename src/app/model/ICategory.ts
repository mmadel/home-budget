export class ICategory{
    _id: number;
    categoryName: string;
    categoryType: string;
    createdDate : string;
    UName : string;
    clear(){
        this._id=null;
        this.categoryName="";
        this.categoryType="";
        this.createdDate="";
    }
}