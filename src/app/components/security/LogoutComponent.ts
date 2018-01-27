import { Component } from '@angular/core';
import { User } from "app/model/User";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "app/services/AuthenticationService";

@Component({
    templateUrl: 'logout.component.html',
    styleUrls: ['login.component.css']
})
export class LogoutComponent {

    constructor(private router: Router) { }

    ngOnInit() {
        localStorage.removeItem('currentUser');;
        localStorage.removeItem('expiryDuration');
        this.router.navigate(['/login']);
    }

}
