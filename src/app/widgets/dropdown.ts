import { Component, Input, forwardRef, AfterViewInit, OnChanges, ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Dropdown),
  multi: true
};

@Component({
  selector: 'dropdown',
  template: `
    <select #select class="custom-select d-block w-100" id="{{controlName}}" disabled="{{disable}}" (change)="onChange($event, select.value)">
      <option *ngFor="let option of options" value="{{option}}">{{option}}</option>
    </select>
    <div class="required-field" *ngFor="let error of errors">
      {{error}}
    </div>
  `,
  styles: [`
  .required-field {
    width: 100 %;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
  }

  input.ng - invalid.ng - touched {
      border-color: red;
  }
`],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class Dropdown implements ControlValueAccessor, AfterViewInit, AfterContentInit {
  @Input() controlName: string;
  @Input() c: FormControl = new FormControl();
  @Input() area: boolean = false;
  @Input() disable: boolean = false;
  options: any[];
  errors: Array<any> = ['This field is required'];
  @ViewChild('select') inputRef: ElementRef; 
  private innerValue: any = '';

  ngAfterContentInit() {
    this.onChange(null, this.options.find((v, i) => { return i == 0 }));
  }

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

  constructor(private renderer: Renderer2) { }

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
          this.errors.push(`The ${this.controlName} is required`);
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
        this.renderer.setValue(this.inputRef.nativeElement, "Manager");
      } else {
        this.options = ["Chef", "Sous chef", "Dishwasher", "Cook"];
        this.renderer.setValue(this.inputRef.nativeElement, "Chef");
      }
      this.onChange(null, this.inputRef.nativeElement.value);
    }

  }
}
