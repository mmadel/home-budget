import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Config } from "app/app.config";
import { User } from "app/model/User";
import * as moment from 'moment/moment';
@Injectable()
export class AuthenticationService {
    private _authenticateUrl = this.config.get('authenticateUrl');
    private _signupUrl = this.config.get('signupUrl');
    private _updateUserUrl = this.config.get('updateUserUrl');
    private token: String;
    constructor(private _http: Http, private config: Config) { }
    singup(user) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        var query = { "name": user.userName, "password": user.password, "email": user.email }
        return this._http.post(this._signupUrl, query, options)
            .map((response: Response) => {
                var result = response.json()
                return result;
            })
    }
    login(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        var query = { "userName": user.userName, "password": user.password }
        return this._http.post(this._authenticateUrl, query, options)
            .map((response: Response) => {
                var result = response.json()
                if (result.success) {
                    user.token = result.token;
                    user.email = result.user.email;
                    user._id = result.user._id;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    var number = result.expiration.number;
                    var type = result.expiration.type;
                    console.log(number + ' ' + type);
                    var current = moment();
                    var expiryDuration = moment().add(number, type).format();
                    localStorage.setItem('expiryDuration', expiryDuration)
                } else {
                    localStorage.removeItem('currentUser');
                }
                return <string>response.json();
            })

    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    updateUser(user) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({
            headers: headers
        });
        var query = { "user": user }
        return this._http.post(this._updateUserUrl, query, options)
            .map((response: Response) => {
                var result = response.json()
                return result;
            })
    }

}