import{Injectable} from '@angular/core'
import {Http , Response, Headers,RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Transaction } from "app/model/Transaction";
import { IBudget } from "app/model/IBudget";
import { EntityChartData } from "app/model/EntityChartData";
import { Config } from "app/app.config";

@Injectable()
export class TransactionService{
    private _transactionsUrl = 'assets/transaction.json'
    private _addtransactionsUrl = this.config.get('addTransactionUrl');
    private _viewtransactionsUrl = this.config.get('viewTransactionsUrl');
    private _deletetransactionsUrl = this.config.get('deleteTransactionsUrl');
    private _listTransactionsChartDateUrl = this.config.get('listTransactionsChartDataUrl');
    
    constructor(private _http : Http,private config: Config){}

    addTransaction(transaction:Transaction){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
          headers: headers
        });
        return this._http.post(this._addtransactionsUrl,JSON.stringify(transaction),options).map((response :Response) => <string>response.json())
    }

    viewTransactions(budget:IBudget){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
          headers: headers
        });
        return this._http.post(this._viewtransactionsUrl,JSON.stringify(budget),options).map((response :Response) => <Transaction[]>response.json())
    }
    deleteTransaction (transaction:Transaction){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
          headers: headers
        });
        return this._http.post(this._deletetransactionsUrl,JSON.stringify(transaction),options).map((response :Response) => <string>response.json())
    }
    getTransactionsChartData(year, month) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.post(this._listTransactionsChartDateUrl, {"year" : year , "month" :month}, options).map((response: Response) => <EntityChartData>response.json())
            .do(data => console.log('TransactionsChartData : ' + JSON.stringify(data)));
    }
}