import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AttendanceListComponent } from './attendance-list/attendance-list.component';


const routes: Routes = [
  {
    path: 'list-attendance',
    component: AttendanceListComponent,

    
  },

];

@NgModule({
  declarations: [AttendanceListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule

  ]
})
export class AttendanceModule { }
