import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Transaction } from "app/model/Transaction";
import { IBudget } from "app/model/IBudget";
export interface ConfirmModel {
  title:string;
  message:string;
  selectedBudget : IBudget;
}
@Component({  
    templateUrl: 'add.transaction.dialog.component.html'
})
export class AddTransactionComponent extends DialogComponent<ConfirmModel, Transaction> implements ConfirmModel {
  title: string;
  message: string;
  selectedBudget : IBudget;
  transaction = new  Transaction();
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = this.transaction;
    this.close();
  }
}