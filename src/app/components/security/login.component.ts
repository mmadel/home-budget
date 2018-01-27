import { Component } from '@angular/core';
import { User } from "app/model/User";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "app/services/AuthenticationService";
import { CredentialService } from "app/services/credential.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    user = new User();
    authentication :any;
    constructor(private router: Router,private authenticationService : AuthenticationService,private _credentialService:CredentialService) { }

    ngOnInit() {
        var user = this._credentialService.getLoggedInUser();
        if(user){
            this.router.navigate(['/']);
        }
    }

    login() {
        this.authenticationService.login(this.user).subscribe(result =>{
            this.authentication = {success:result["success"] , message:result["message"]}
            console.log('@@ ' + localStorage.getItem('currentUser'))
            this.router.navigate(['/']);
        });
    }
}
