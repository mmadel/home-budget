import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { IBudget } from "../model/IBudget";
import { AppConfig } from "config/AppConfig";

@Injectable()
export class BudgetService {
    private _listBudgetUrl = this.config.getConfig('listBudgetUrl');
    private _addBudgetUrl =this.config.getConfig('addBudgetUrl');
    private _deleteBudgetUrl =this.config.getConfig('deleteBudgetUrl');
    budgets: IBudget[];
    constructor(private _http: Http,private config: AppConfig) { }
    getBudgets() {
        return this._http.get(this._listBudgetUrl).map((response: Response) => this.budgets = <IBudget[]>response.json())
            .do(data => console.log('getBudgets : ' + JSON.stringify(data)));
    }
    addBudget(budget: IBudget) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        console.log("addBudget model is "+ JSON.stringify(budget));
        return this._http.post(this._addBudgetUrl, JSON.stringify(budget), options).map((response: Response) => <string>response.json());
    }
    deleteBudget(budgetId){
        return this._http.post(this._deleteBudgetUrl,{"id":budgetId} ).map((response:Response) => response.json());
    }
}