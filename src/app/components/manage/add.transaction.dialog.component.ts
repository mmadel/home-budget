import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Transaction } from "app/model/Transaction";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    templateUrl: 'add.transaction.dialog.component.html'
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, Transaction> implements ConfirmModel {
  title: string;
  message: string;
  transaction = new  Transaction();
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = this.transaction;
    this.close();
  }
}