import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { DepartmentListComponent } from './department-list/department-list.component';



const routes: Routes = [
  {
    path: 'list-department',
    component:  DepartmentListComponent,

    
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
  declarations: [DepartmentListComponent]

})
export class DepartmentModule { }
