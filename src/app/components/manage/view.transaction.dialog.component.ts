import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Transaction } from "app/model/Transaction";
import { TransactionService } from "app/services/TransactionService";
import { IBudget } from "app/model/IBudget";
export interface ConfirmModel {
  title:string;
  message:string;
  selectedBudget : IBudget;
}
@Component({  
    templateUrl: 'view.transaction.dialog.component.html'
})
export class ViewTransactionComponent extends DialogComponent<ConfirmModel, Transaction[]> implements ConfirmModel ,OnInit{
  title: string;
  message: string  ;
  transactions : Transaction[];
  selectedBudget : IBudget;
  constructor(dialogService: DialogService,private _transactionService : TransactionService) {
    super(dialogService);
  }
  ngOnInit():void{
    this._transactionService.getTransactionsByBudgetId()
    .subscribe(transactions => this.transactions = transactions);
} 
deleteTransaction(transactionId){
  //this._categoryService.deleteCategory(categoryId)
  for(var index = 0; index < this.transactions.length; index++) {
      if(this.transactions[index].transactionId == transactionId) {
        this.transactions.splice(index, 1);
      }
    }     
  }
}