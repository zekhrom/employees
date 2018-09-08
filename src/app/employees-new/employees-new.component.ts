import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employees';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FormBuilder, FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { CommonService } from '../services/common.services';

@Component({
  selector: 'app-employees-new',
  templateUrl: './employees-new.component.html',
  styleUrls: ['./employees-new.component.css'],
  providers: [CommonService]
})
export class EmployeesNewComponent implements OnInit {
  myForm: FormGroup;
  employee: Employee;
  areas: string[];
  isServices: true;
  countries: string[];

  constructor(private store: Store<AppState>, private fb: FormBuilder, private commonService: CommonService) {
    this.myForm = this.fb.group(
      {
        name: ['', Validators.required],
        dob: [new Date(), Validators.required],
        jobTitle: ['', Validators.required],
        country: ['', Validators.required],
        username: ['', Validators.required],
        hireDate: [new Date(), Validators.required],
        tipRate: ['', Validators.required],
        status: ['', Validators.required]
      },
      {
        validator: [this.validateAge()]
      }
    );

    this.areas = ["Manager", "Host", "Tuttofare"];
    this.commonService.getCountries().then((data) => {
      this.countries = data.map((data) => { return data.name.toString() });
    });
  }

  validateAge(): ValidatorFn {
    return (formGroup: FormGroup) => {
      var dobControl = formGroup.get('dob');
      var dob = new Date(dobControl.value);
      if (this.calculateAge(dob) < 18) {
        return null;
      } else {
        return {
          validAge: true
        }
      }
    };
  }

  calculateAge(dob: Date): number {
    if (dob == null)
      return 0;

    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  addEmployee() {
    const dobControl = this.myForm.get('dob');
    this.employee.age = this.calculateAge(dobControl.value);
    this.employee.area = this.isServices ? 'Services' : 'Kitchen';

    this.store.dispatch({
      type: 'ADD',
      payload: this.employee
    });
  }

  ngOnInit() {
  }

}
