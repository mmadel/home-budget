import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ICategory} from '../../model/ICategory';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    styleUrls: ['addcategory.componenet.css'],
    templateUrl: 'addcategory.component.html'
})
export class AddCategoryComponent{
     category =new ICategory() ;
     
     constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
     }
    onSubmit(){
        console.log(this.category);
        this.category.clear();
        this.toastr.success('Category is created successfully', 'Success!');
    }
}