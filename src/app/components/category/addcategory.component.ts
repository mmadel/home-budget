import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ICategory } from '../../model/ICategory';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CategoryService } from "app/services/category.service";
@Component({
    styleUrls: ['addcategory.componenet.css'],
    templateUrl: 'addcategory.component.html'
})
export class AddCategoryComponent {
    category = new ICategory();
    //https://toddmotto.com/angular-2-forms-template-driven
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private _categoryService: CategoryService) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    onSubmit() {
        this.category.UName='mmadel';
        this._categoryService.addCategory(this.category).subscribe(result => {
            result;
            this.category.clear();
            this.toastr.success('',result['message']);
        }
        )
    }
}