import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from "app/model/User";
import { CredentialService } from "app/services/credential.service";
import { AuthenticationService } from "app/services/AuthenticationService";
import { ToastsManager } from "ng2-toastr";
import { Router } from "@angular/router";
import { Password } from "app/model/password";

@Component({
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
    user: User;
    password =new Password();
    constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, private _credentialService: CredentialService, private _authenticationService: AuthenticationService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(): void {
        this.user = this._credentialService.getLoggedinUserProfile();
    }
    updateProfile(): void {
        this._authenticationService.updateUser(this.user).subscribe(result => {
            if (result == 'success') {
                this._credentialService.updateLoggedinUserProfile(this.user);
                this.toastr.success('', 'UserProfile is updated successfully');
            }
        });
    }
    updatePassword():void{
        var isCurrentPasswordValid = this.validateCurrentPassword();
        var isnewPasswordValid = this.validateNewPassword()
        if( isCurrentPasswordValid && isnewPasswordValid){
            this.user.password = this.password.newPassword;
            this._authenticationService.updateUser(this.user).subscribe(result => {
                if (result == 'success') {
                    this._credentialService.updateLoggedinUserProfile(this.user);
                    this.toastr.success('', 'Password is updated successfully');
                }
            });
        }else{
            if(!isCurrentPasswordValid){
                this.toastr.error('', 'Enter correct current password');
                return;
            }
            if(!isnewPasswordValid){
                this.toastr.error('', 'new password is not match');
            }
        }
    }
    validateCurrentPassword():boolean{
        if(this.password.currentPassword == this._credentialService.getLoggedinUserProfile().password){
            return true;
        }else{
            return false;
        }
    }
    validateNewPassword():boolean{
        if(this.password.newPassword == this.password.confirmPassword){
            return true;
        }else{
            return false;
        }
    }
}