import{Injectable} from '@angular/core'
import {Http , Response, Headers,RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Transaction } from "app/model/Transaction";
import { AppConfig } from "config/AppConfig";
import { IBudget } from "app/model/IBudget";

@Injectable()
export class TransactionService{
    private _transactionsUrl = 'assets/transaction.json'
    private _addtransactionsUrl = this.config.getConfig('addTransactionUrl');
    private _viewtransactionsUrl = this.config.getConfig('viewTransactionsUrl');
    private _deletetransactionsUrl = this.config.getConfig('deleteTransactionsUrl');
    
    constructor(private _http : Http,private config: AppConfig){}

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
}