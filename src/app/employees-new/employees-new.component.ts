import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employees';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-employees-new',
  templateUrl: './employees-new.component.html',
  styleUrls: ['./employees-new.component.css']
})
export class EmployeesNewComponent implements OnInit {

  employee: Employee;
  serviceAreas = ["Manager", "Host", "Tuttofare"]

  constructor(private store: Store<AppState>) { }

  addEmployee(name, price) {
    this.store.dispatch({
      type: 'ADD',
      payload: this.employee
    });
  }

  ngOnInit() {
  }

}
