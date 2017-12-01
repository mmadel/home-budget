import {Component,OnInit,ViewContainerRef} from '@angular/core'
import { IBudget } from "../../model/IBudget";
import { ICategory } from "../../model/ICategory";
import { CategoryService } from "../../services/category.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    styleUrls:['addbudget.componenet.css'],
    templateUrl: 'addbudget.componenet.html'
})
export class AddBudgetComponent implements OnInit{
    budget = new IBudget();
    categories : ICategory[];    
    constructor(private _categoryService : CategoryService,public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
     }
    ngOnInit():void{
        this._categoryService.getCategories()
        .subscribe(categories => this.categories = categories);
    }
    onSubmit(){
        console.log(this.budget);
        this.budget.clear();
        this.toastr.success('Budget is created successfully', 'Success!');
    }
}