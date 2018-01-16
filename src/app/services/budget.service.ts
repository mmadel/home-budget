import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { IBudget } from "../model/IBudget";
import { Config } from "app/app.config";
import { EntityChartData } from "app/model/EntityChartData";


@Injectable()
export class BudgetService {
    private _listBudgetUrl = this.config.get('listBudgetUrl');
    private _addBudgetUrl = this.config.get('addBudgetUrl');
    private _deleteBudgetUrl = this.config.get('deleteBudgetUrl');
    private _listMonthlyBudgetUrl = this.config.get('listMonthlyBudgetUrl');

    budgets: IBudget[];
    constructor(private _http: Http, private config: Config) { }
    getBudgets(userName) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        var query = {"userName": userName}
        return this._http.post(this._listBudgetUrl,query,options).map((response: Response) => this.budgets = <IBudget[]>response.json())
            .do(data => console.log('getBudgets : ' + JSON.stringify(data)));
    }
    addBudget(budget: IBudget) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        console.log("addBudget model is " + JSON.stringify(budget));
        return this._http.post(this._addBudgetUrl, JSON.stringify(budget), options).map((response: Response) => <string>response.json());
    }
    deleteBudget(budgetId) {
        return this._http.post(this._deleteBudgetUrl, { "id": budgetId }).map((response: Response) => response.json());
    }

    getBudgetMonthlyChart() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.post(this._listMonthlyBudgetUrl, options).map((response: Response) => <EntityChartData>response.json());
    }
}