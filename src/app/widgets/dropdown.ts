import { Component, Input, forwardRef, AfterViewInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Dropdown),
  multi: true
};

@Component({
  selector: 'dropdown',
  template: `
    <select #select class="custom-select d-block w-100" id="{{controlName}}" (change)="onChange($event, select.value)">
      <option *ngFor="let option of options" value="{{option}}">{{option}}</option>
    </select>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class Dropdown implements ControlValueAccessor, AfterViewInit {
  @Input() controlName: string;
  options: any[];
  @Input() c: FormControl = new FormControl();
  @Input() area: boolean = false;
  errors: Array<any> = ['This field is required'];
  @ViewChild('select') inputRef: ElementRef; 
  private innerValue: any = '';


  ngAfterViewInit() {
    this.c.valueChanges.subscribe(
      () => {
        if (this.c.value == "" || this.c.value == null || this.c.value == undefined) {
          this.innerValue = "";
          this.inputRef.nativeElement.value = "";
        }
      }
    );
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  };
  
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  onChange(e: Event, value: any) {
    this.innerValue = value;
    this.propagateChange(this.innerValue);

    this.errors = [];
    for (var key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        if (key === "required") {
          this.errors.push("This field is required");
        } else {
          this.errors.push(this.c.errors[key]);
        }
      }
    }
  }

  propagateChange = (_: any) => { }

  writeValue(value: any) {
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  ngOnChanges(changes: any) {
    if (changes.area != null) {
      if (changes.area.currentValue) {
        this.options = ["Manager", "Host", "Tuttofare", "Waitress", "Dinning room manager"];
      } else {
        this.options = ["Chef", "Sous chef", "Dishwasher", "Cook"];
      }
    }

  }
}
