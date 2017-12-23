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
    templateUrl: 'edit.budget.dialog.component.html'
})
export class EditBudgetComponent extends DialogComponent<ConfirmModel, IBudget> implements ConfirmModel ,OnInit{
  title: string;
  message: string  ;
  transactions : Transaction[];
  selectedBudget : IBudget;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  ngOnInit():void{
    
} 
  edit() :void{
    console.log("######################################");
    this.result = this.selectedBudget;
    this.close();
  }
}