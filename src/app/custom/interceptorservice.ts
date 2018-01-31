import { Injectable, Injector } from '@angular/core';
import { Http, ConnectionBackend, Headers, RequestOptions, Request, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CredentialService } from "app/services/credential.service";
import { Config } from "app/app.config";

export class InterceptorService extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private injector: Injector) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

        return super.request(url, options);
    }
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        if (url != this._getConfigService().get('authenticateUrl') && url != this._getConfigService().get('signupUrl')) {
            options = this._setCustomHeaders(options);
        }
        return super.post(url, body, options);
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this._setCustomHeaders(options);
        return super.get(url, options);
    }
    _getCredentialService(): CredentialService {
        return this.injector.get(CredentialService);
    }
    _getConfigService(): Config {
        return this.injector.get(Config);
    }
    _setCustomHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            console.log('!options');
            options = new RequestOptions({});
        }

        options.headers = new Headers();
        options.headers.set("Authorization", 'Bearer ' + this._getCredentialService().getToken())
        options.headers.set("Content-Type", 'application/json')
        return options;
    }
}