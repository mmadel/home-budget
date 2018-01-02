import{Injectable} from '@angular/core'
import { Http, Response, Headers,RequestOptions } from '@angular/http'
import {Observable} from 'rxjs/Observable'

import {ICategory} from '../model/ICategory'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { AppConfig } from "config/AppConfig";

@Injectable()
export class CategoryService{
    private _listCategoryUrl = this.config.getConfig('listCategoriesUrl');
    private _addCategoryUrl = this.config.getConfig('addCategoryUrl');
    private _deleteCategoryUrl = this.config.getConfig('deleteCategoryUrl');
    categories : ICategory[];
    constructor(private _http : Http,private config: AppConfig){}
    

    getCategories(){
        return this._http.get(this._listCategoryUrl).map((response:Response) => <ICategory[]>response.json())
        .do(data => console.log('All : '+  JSON.stringify(data)));
    }

    addCategory( category : ICategory){
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

}