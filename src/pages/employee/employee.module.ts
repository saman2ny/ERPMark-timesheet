import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { EmployeeListComponent } from './employee-list/employee-list.component';


const routes: Routes = [
  {
    path: 'list-employee',
    component:  EmployeeListComponent,

    
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  declarations: [EmployeeListComponent],

})
export class EmployeeModule { }
