import { Injectable } from "@angular/core";
import { Config } from "app/app.config";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from "app/model/User";

@Injectable()
export class CredentialService {
    private _verfiyTokenUrl = this.config.get('verfiyTokenUrl');
    constructor(private _http: Http, private config: Config) { }
    getLoggedinUserProfile():User{
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    getLoggedInUser(): string {
        if(JSON.parse(localStorage.getItem('currentUser'))){
            return JSON.parse(localStorage.getItem('currentUser'))["userName"];
        }else{
            return null;
        }
    }
    getToken(): string {
        if(JSON.parse(localStorage.getItem('currentUser'))){
            return JSON.parse(localStorage.getItem('currentUser'))["token"];
        }else{
            return null;
        }
    }
}