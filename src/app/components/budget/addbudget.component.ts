import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { IBudget } from "../../model/IBudget";
import { ICategory } from "../../model/ICategory";
import { CategoryService } from "../../services/category.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BudgetService } from "app/services/budget.service";
@Component({
    styleUrls: ['addbudget.componenet.css'],
    templateUrl: 'addbudget.componenet.html'
})
export class AddBudgetComponent implements OnInit {
    budget = new IBudget();
    categories: ICategory[];
    constructor(private _categoryService: CategoryService, public toastr: ToastsManager, vcr: ViewContainerRef, private _budgetService: BudgetService) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit(): void {
        this._categoryService.getCategories()
            .subscribe(categories => this.categories = categories);
    }
    onSubmit() {
        this.budget.UName='mmadel';
        console.log(JSON.stringify(this.budget))
        this._budgetService.addBudget(this.budget).subscribe(result =>{
            this.budget.clear();
            this.toastr.success(result['message'], 'Success!');
        });
        
    }
}