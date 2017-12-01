import{Injectable} from '@angular/core'
import {Http , Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import { IBudget } from "../model/IBudget";

@Injectable()
export class BudgetService{
    private _budgetUrl = 'assets/budget.json'
    budgets : IBudget[];
    constructor(private _http : Http){}
    getBudgets(){
        return this._http.get(this._budgetUrl).map((response:Response) => this.budgets=<IBudget[]>response.json())
        .do(data => console.log('All : '+  JSON.stringify(data)));
    }
}