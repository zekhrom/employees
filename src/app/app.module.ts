import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeesNewComponent } from './components/employees-new/employees-new.component';
import { Dropdown } from './modules/widgets/dropdown';
import { EmployeesPipe } from './modules/pipes/employees.pipes';
import { addEmployeeReducer } from './modules/reducers/employee.reducer';
import { environment } from '../environments/environment.prod';

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
    Dropdown,
    EmployeesPipe
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
