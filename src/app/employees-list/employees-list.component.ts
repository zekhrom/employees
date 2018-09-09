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

  employees: Employee[];
  searchText: string;

  constructor(private store: Store<AppState>) {
    this.store.select(state => state.employee).subscribe((result) => {
      this.employees = result;
    });
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
