import { Component, OnInit } from '@angular/core';
import { BudgetService } from  '../../services/budget.service'
import { IBudget } from "../../model/IBudget";

@Component({
    templateUrl: 'budget.component.html'
})
export class BudgetComponent implements OnInit {
    constructor(private _budgetService : BudgetService){}
    budgets : IBudget[];
    ngOnInit():void{
        this._budgetService.getBudgets()
        .subscribe(budgets => this.budgets = budgets);
    }  
    deleteBudget(budgetId){
        //this._categoryService.deleteCategory(categoryId)
        for(var index = 0; index < this.budgets.length; index++) {
            if(this.budgets[index]._id == budgetId) {
                this._budgetService.deleteBudget(budgetId).subscribe(result => {                    
                });
              this.budgets.splice(index, 1);
            }
          }
    }      
}