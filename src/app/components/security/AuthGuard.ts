import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { CredentialService } from "app/services/credential.service";
import { AuthenticationService } from "app/services/AuthenticationService";
import * as moment from 'moment/moment';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _credentialService: CredentialService, private _authenticationService: AuthenticationService) { }

    canActivate(): boolean {
        console.log('canActivate');
        var token = this._credentialService.getToken();
        if (token) {
            if (this.verfiyTokenExpiration()) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            };
        } else {
            this.router.navigate(['/login']);
            return false;
        }

    }

    verfiyTokenExpiration(): boolean {
        var expiration = moment(localStorage.getItem('expiryDuration'));
        var seconds = expiration.diff(moment(), 'seconds');
        console.log(seconds)
        if (seconds > 0) {
            return true;
        } else {
            return false;
        }
    }
}