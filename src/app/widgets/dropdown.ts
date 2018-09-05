import { Component, Input } from '@angular/core';

@Component({
  selector: 'dropdown',
  template: `
    <select class="custom-select d-block w-100" id="country" [(ngModel)]="model" required="">
      <option *ngFor="let option of options" value="option">option</option>
    </select>
  `
})
export class Dropdown {
  // color name
  @Input()
  model;

  // disabled state
  @Input()
  options: any[];
  
}
