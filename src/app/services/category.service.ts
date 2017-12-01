import{Injectable} from '@angular/core'
import {Http , Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'

import {ICategory} from '../model/ICategory'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

@Injectable()
export class CategoryService{
    private _categoryUrl = 'assets/categories.json'
    categories : ICategory[];
    constructor(private _http : Http){}
    

    getCategories(){
        return this._http.get(this._categoryUrl).map((response:Response) => <ICategory[]>response.json())
        .do(data => console.log('All : '+  JSON.stringify(data)));
    }

    deleteCategory(categoryId){
        
    }

}