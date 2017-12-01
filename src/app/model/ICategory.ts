export class ICategory{
    categoryId: number;
    categoryName: string;
    categoryType: string;
    createdDate : string;

    clear(){
        this.categoryId=null;
        this.categoryName="";
        this.categoryType="";
        this.createdDate="";
    }
}