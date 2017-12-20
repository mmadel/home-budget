import{Injectable} from '@angular/core'
import {Http , Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import { Transaction } from "app/model/Transaction";

@Injectable()
export class TransactionService{
    private _transactionsUrl = 'assets/transaction.json'
    
    constructor(private _http : Http){}
    

    getTransactionsByBudgetId(){
        return this._http.get(this._transactionsUrl).map((response:Response) => <Transaction[]>response.json());
    }

}