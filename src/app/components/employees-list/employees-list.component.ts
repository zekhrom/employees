import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employee } from '../../modules/models/employees';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

  employees: Employee[];
  searchText: string;

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.employee).subscribe(result => this.employees = result);
  }

  deleteEmployee = id =>  this.store.dispatch({ type: 'DELETE', payload: id });
}
