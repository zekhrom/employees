import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesNewComponent } from './employees-new/employees-new.component';
import { addEmployeeReducer } from './reducers/employee.reducer';
import { Dropdown } from './widgets/dropdown';

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent
  },
  {
    path: 'Edit/:id',
    component: EmployeesNewComponent
  },
  {
    path: 'New',
    component: EmployeesNewComponent
  },
  {
    path: '**',
    redirectTo: '/error?code=notfound',
  },
];


@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeesNewComponent,
    Dropdown
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ blockchain: addEmployeeReducer }),
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
