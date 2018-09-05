import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employees';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[];

  constructor() { }

  ngOnInit() {
  }

}
