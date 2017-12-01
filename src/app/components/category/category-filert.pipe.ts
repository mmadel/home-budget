import {PipeTransform,Pipe} from '@angular/core'
import {ICategory} from '../../model/ICategory'
@Pipe({
    name : 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform{

    transform(value :ICategory[] , filterBy:string):ICategory[]{
        filterBy=filterBy ? filterBy.toLowerCase() : null;
        
      return filterBy?value.filter((category: ICategory)=>
      category.categoryName.toLowerCase().indexOf(filterBy) !== -1):value;
    }
}