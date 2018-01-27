import { Component } from '@angular/core';
import { User } from "app/model/User";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "app/services/AuthenticationService";

@Component({
    templateUrl: 'signup.component.html',
    styleUrls: ['login.component.css']
})
export class SignupComponent {
    user = new User();
    constructor(private router: Router,private authenticationService : AuthenticationService){}

    signup(){
        console.log('signup ' + JSON.stringify(this.user));
        this.authenticationService.singup(this.user).subscribe(result =>{
            this.router.navigate(['/login']);
        });
    }
}
