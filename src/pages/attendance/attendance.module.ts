import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';


const routes: Routes = [
  {
    path: 'list-attendance',
    component: AttendanceListComponent,

    
  },
  {
    path: 'list-holidays',
    component: HolidayListComponent,

    
  },

];

@NgModule({
  declarations: [AttendanceListComponent, HolidayListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule

  ]
})
export class AttendanceModule { }
