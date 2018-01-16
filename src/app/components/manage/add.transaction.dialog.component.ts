import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Transaction } from "app/model/Transaction";
import { IBudget } from "app/model/IBudget";
import { TransactionService } from "app/services/TransactionService";
export interface ConfirmModel {
  title: string;
  message: string;
  selectedBudget: IBudget;
}
@Component({
  templateUrl: 'add.transaction.dialog.component.html'
})
export class AddTransactionComponent extends DialogComponent<ConfirmModel, Transaction> implements ConfirmModel {
  title: string;
  message: string;
  selectedBudget: IBudget;
  transaction = new Transaction();
  constructor(dialogService: DialogService, private _transactionService: TransactionService) {
    super(dialogService);
  }
  confirm(selectedBudget) {
    this.result = this.transaction;
    this.transaction.budget = selectedBudget;
    this.transaction.transactionName = selectedBudget.category.categoryName;
    this.transaction.UName ='mmadel'
    this._transactionService.addTransaction(this.transaction).subscribe(result => {
      console.log(JSON.stringify(this.transaction))
      this.close();
    });
  }
}