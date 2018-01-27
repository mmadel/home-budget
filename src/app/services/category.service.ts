import{Injectable} from '@angular/core'
import { Http, Response, Headers,RequestOptions } from '@angular/http'
import {Observable} from 'rxjs/Observable'

import {ICategory} from '../model/ICategory'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Config } from "app/app.config";
import { EntityChartData } from "app/model/EntityChartData";
import { CredentialService } from "app/services/credential.service";


@Injectable()
export class CategoryService{
    private _listCategoryUrl = this.config.get('listCategoriesUrl');
    private _addCategoryUrl = this.config.get('addCategoryUrl');
    private _deleteCategoryUrl = this.config.get('deleteCategoryUrl');
    private _listCategoriesChartDataUrl =this.config.get('listCategoriesChartDataUrl');
    categories : ICategory[];
    constructor(private _http : Http,public config: Config,private _credentialService:CredentialService){}
    

    getCategories(){
        var userName = this._credentialService.getLoggedInUser();
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
          headers: headers
        });
        var query = {"userName": userName}
        return this._http.post(this._listCategoryUrl,query,options).map((response:Response) => <ICategory[]>response.json())
        .do(data => console.log('All : '+  JSON.stringify(data)));
    }

    addCategory( category : ICategory){
        category.UName=this._credentialService.getLoggedInUser();;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
          headers: headers
        });
        return this._http.post(this._addCategoryUrl, JSON.stringify(category),options).map((response:Response) => <string>response.json());
    }
    deleteCategory(categoryId){
        return this._http.post(this._deleteCategoryUrl,{"id":categoryId} ).map((response:Response) => response.json());
    }
    getCategoriesChartData(year, month) {
        var userName = this._credentialService.getLoggedInUser();
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.post(this._listCategoriesChartDataUrl, {"year" : year , "month" :month,"userName":userName}, options).map((response: Response) => <EntityChartData>response.json())
            .do(data => console.log('CategoriesChartData : ' + JSON.stringify(data)));
    }
}