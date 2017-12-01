import { Pipe, PipeTransform } from "@angular/core";
import { Group } from "app/model/Group";


@Pipe({
    name : 'accountSummaryTypeFilter'
})
export class AccountSummaryTypeFilterPipe implements PipeTransform{
    transform(value :Group[] , filterBy:string):Group[]{
      if (value==null) {
        return null;
      }
      return value.filter((group: Group)=>{
          return group.type.indexOf(filterBy) !== -1;
      });   
    }
}