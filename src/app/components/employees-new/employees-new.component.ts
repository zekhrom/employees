import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../modules/models/employees';
import { AppState } from '../../app.state';
import { CommonService } from '../../modules/services/common.services';

@Component({
  selector: 'app-employees-new',
  templateUrl: './employees-new.component.html',
  styleUrls: ['./employees-new.component.css'],
  providers: [CommonService]
})
export class EmployeesNewComponent {
  title: string = "New Employee";
  employee: Employee = {};
  myForm: FormGroup;
  isServices: boolean = true;
  countries: string[];
  maxDate: string = (new Date).toISOString().substring(0, 10);
  hasTips: boolean;
  lastId: number;
  id: number;
  readOnly: boolean;
  selectedCountry: string;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router) {

    this.myForm = this.fb.group(
      {
        name: ['', Validators.required],
        dob: [null , Validators.required],
        jobTitle: ['', Validators.required],
        country: ['', Validators.required],
        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
        hireDate: [null, Validators.required],
        tipRate: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
        status: [true, Validators.required]
      },
      {
        validator: [this.validateAge()]
      }
    );

    this.commonService.getCountries().then(data =>  this.countries = data.map((data) => { return data.name.toString() }));

    if (this.route.snapshot.paramMap.has('id')) {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.setEmployee(this.id);
    }

    if (this.route.routeConfig.path.includes('View')) {
      this.myForm.disable();
      this.readOnly = true;
      this.title = `Viewing: ${this.title}`;
    } else if (this.route.routeConfig.path.includes('Edit')) {
      this.title = `Editing: ${this.title}`;
    }

    this.validateTips();
    this.store.select(state => state.employee).subscribe((employees) => {
      this.lastId = employees.length;
    });
  }

  setEmployee(id: number) {
    this.store.select(state => state.employee).subscribe((employees) => {
      this.employee = employees.find(item => { return item.id == id });
    });
  }

  validateAge(): ValidatorFn {
    return (formGroup: FormGroup) => {
      let dobControl = formGroup.get('dob');
      let dob = new Date(dobControl.value);
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
    if (this.id == null) {
      this.store.dispatch({
        type: 'ADD',
        payload: {
          name: this.myForm.get('name').value,
          area: this.isServices,
          age: this.calculateAge(dob),
          dob: this.myForm.get('dob').value,
          jobTitle: this.myForm.get('jobTitle').value,
          country: this.myForm.get('country').value,
          username: this.myForm.get('username').value,
          hireDate: this.myForm.get('hireDate').value,
          tipRate: this.myForm.get('tipRate').value,
          status: this.myForm.get('status').value,
          id: ++this.lastId
        }
      });
    } else {
      this.store.dispatch({
        type: 'EDIT',
        payload: {
          name: this.myForm.get('name').value,
          area: this.isServices,
          age: this.calculateAge(dob),
          dob: this.myForm.get('dob').value,
          jobTitle: this.myForm.get('jobTitle').value,
          country: this.myForm.get('country').value,
          username: this.myForm.get('username').value,
          hireDate: this.myForm.get('hireDate').value,
          tipRate: this.myForm.get('tipRate').value,
          status: this.myForm.get('status').value,
          id: this.id
        }
      });

    }
    this.router.navigate(['/']);
  }

  validateTips() {
    const jobControl = this.myForm.get('jobTitle');
    this.hasTips = ["Dinning room manager", "Waitress"].includes(jobControl.value);
    const tipControl = this.myForm.get('tipRate');
    if (!this.hasTips) {
      tipControl.clearValidators();
    } else {
      tipControl.setValidators([Validators.required, Validators.max(100), Validators.min(0)]);
    }
    tipControl.updateValueAndValidity();
  }

}
