import{Injectable} from '@angular/core'
import {Http , Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import { AccountSummary } from "../model/AccountSummary";
import { UsageSummary } from "../model/usageSummary";

@Injectable()
export class ManageService{
    private _manageAccountSummaryUrl = 'assets/accountsummary.json'
    private _manageUsageSummaryUrl = 'assets/usage.json'
    accountSummary : AccountSummary;
    constructor(private _http : Http){}
    getAccountSummary(){
        return this._http.get(this._manageAccountSummaryUrl).map((response:Response) =>  <AccountSummary>response.json())
        .do(data => console.log('AccountSummary : '+  JSON.stringify(data)));
    }
    getUsageSummary(){
        return this._http.get(this._manageUsageSummaryUrl).map((response:Response) =>  <UsageSummary>response.json())
        .do(data => console.log('UsageSummary : '+  JSON.stringify(data)));
    }
}