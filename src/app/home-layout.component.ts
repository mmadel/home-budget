import { Component, OnInit } from '@angular/core';
import { User } from "app/model/User";
import { CredentialService } from "app/services/credential.service";

@Component({
  selector: 'app-home-layout',
  templateUrl: 'home-layout.component.html',
  styles: []
})
export class HomeLayoutComponent implements OnInit {
  user = new User();
  constructor(private _credentialService: CredentialService) { }
  ngOnInit(): void {
    this.user = this._credentialService.getLoggedinUserProfile();
  }
}