import{Injectable} from '@angular/core'
import {Http , Response, Headers,RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Transaction } from "app/model/Transaction";
import { AppConfig } from "config/AppConfig";

@Injectable()
export class TransactionService{
    private _transactionsUrl = 'assets/transaction.json'
    private _addtransactionsUrl = this.config.getConfig('addTransactionUrl');
    
    constructor(private _http : Http,private config: AppConfig){}

    getTransactionsByBudgetId(){
        return this._http.get(this._transactionsUrl).map((response:Response) => <Transaction[]>response.json());
    }

    addTransaction(transaction:Transaction){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
          headers: headers
        });
        return this._http.post(this._addtransactionsUrl,JSON.stringify(transaction),options).map((response :Response) => <string>response.json())
    }
}