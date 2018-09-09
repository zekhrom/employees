import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employees';

@Pipe({
  name: 'employeefilter',
  pure: false
})
export class EmployeesPipe implements PipeTransform {
  transform(items: Employee[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(o =>
      Object.keys(o).some(k => o[k].toString().toLowerCase().includes(filter.toLowerCase())));;
  }
}
