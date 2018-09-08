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
  isServices: true;
  countries: string[];
  maxDate: string = (new Date).toISOString().substring(0, 10);
  hasTips: boolean;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private commonService: CommonService) {
    this.myForm = this.fb.group(
      {
        name: ['', Validators.required],
        dob: [null , Validators.required],
        jobTitle: ['', Validators.required],
        country: ['', Validators.required],
        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
        hireDate: [null, Validators.required],
        tipRate: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
        status: [false, Validators.required]
      },
      {
        validator: [this.validateAge()]
      }
    );

    this.validateTips();

    this.commonService.getCountries().then((data) => {
      this.countries = data.map((data) => { return data.name.toString() });
    });
  }

  validateAge(): ValidatorFn {
    return (formGroup: FormGroup) => {
      var dobControl = formGroup.get('dob');
      var dob = new Date(dobControl.value);
      if (this.calculateAge(dob) < 18) {
        return {
          validAge: false
        };
      } else {
        return null
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
    var dob = new Date(dobControl.value);

    this.store.dispatch({
      type: 'ADD',
      payload: {
        name: this.myForm.get('name').value,
        area: this.isServices,
        age: this.calculateAge(dob),
        jobTitle: this.myForm.get('jobTitle').value,
        country: this.myForm.get('country').value,
        username: this.myForm.get('username').value,
        hireDate: this.myForm.get('hireDate').value,
        id: 1
      }
    });
  }

  validateTips() {
    const jobControl = this.myForm.get('jobTitle');
    this.hasTips = ["Dinning room manager", "Waitress"].includes(jobControl.value);
    const tipControl = this.myForm.get('tipRate');
    if (!this.hasTips) {
      tipControl.clearValidators();
    } else {
      tipControl.setValidators(Validators.required);
    }
    tipControl.updateValueAndValidity();
  }

  ngOnInit() { }

}
