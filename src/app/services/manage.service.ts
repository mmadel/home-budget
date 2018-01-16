import{Injectable} from '@angular/core'
import {Http , Response, Headers,RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import { AccountSummary } from "../model/AccountSummary";
import { UsageSummary } from "../model/usageSummary";
import { Config } from "app/app.config";

@Injectable()
export class ManageService{
    private _manageAccountSummaryUrl = this.config.get('manageAccountSummaryUrl');
    private _manageUsageSummaryUrl = this.config.get('manageUsageSummaryUrl');
    accountSummary : AccountSummary;
    constructor(private _http : Http,private config: Config){}
    getAccountSummary(userName: string , period : string){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
          headers: headers
        });
        var query = {"UName": userName , "periodon" : period}
        return this._http.post(this._manageAccountSummaryUrl,query,options).map((response:Response) =>  <AccountSummary>response.json());
    }
    getUsageSummary(){
        return this._http.get(this._manageUsageSummaryUrl).map((response:Response) =>  <UsageSummary>response.json())
        .do(data => console.log('UsageSummary : '+  JSON.stringify(data)));
    }
}