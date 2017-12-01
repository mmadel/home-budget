import {PipeTransform,Pipe} from '@angular/core'
import {IBudget} from '../../model/IBudget'
@Pipe({
    name : 'budgetFilter'
})
export class BudgetFilterPipe implements PipeTransform{

    transform(value :IBudget[] , filterBy:string):IBudget[]{
        filterBy=filterBy ? filterBy.toLowerCase() : null;
      return filterBy?value.filter((budget: IBudget)=>
      budget.budgetName.toLowerCase().indexOf(filterBy) !== -1):value;
    }
}