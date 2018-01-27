import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'
import { ICategory } from '../../model/ICategory'
@Component({
    templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {
    filter: string;
    constructor(private _categoryService: CategoryService) { }
    categories: ICategory[];
    ngOnInit(): void {
        
        this._categoryService.getCategories()
            .subscribe(categories => this.categories = categories);
    }

    deleteCategory(categoryId) {        
        for (var index = 0; index < this.categories.length; index++) {
            if (this.categories[index]._id == categoryId) {
                this._categoryService.deleteCategory(categoryId).subscribe(result => {                    
                });
                this.categories.splice(index, 1);
            }
        }
    }
}
