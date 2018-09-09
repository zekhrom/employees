import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employees';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Observable<Employee[]>;
  constructor(private store: Store<AppState>) {
    this.employees = this.store.select(state => state.employee);
  }

  deleteEmployee(id) {
    this.store.dispatch({
      type: 'DELETE',
      payload: id
    });
  }

  ngOnInit() {
  }

}
