import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesNewComponent } from './employees-new.component';

describe('EmployeesNewComponent', () => {
  let component: EmployeesNewComponent;
  let fixture: ComponentFixture<EmployeesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
