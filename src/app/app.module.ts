import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesNewComponent } from './employees-new/employees-new.component';
import { addEmployeeReducer } from './reducers/employee.reducer';
import { Dropdown } from './widgets/dropdown';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent
  },
  {
    path: 'View/:id',
    component: EmployeesNewComponent
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
    ReactiveFormsModule,
    HttpModule,
    StoreModule.forRoot({ employee: addEmployeeReducer }),
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        preloadingStrategy: PreloadAllModules
      }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
