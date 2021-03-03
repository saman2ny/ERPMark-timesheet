import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TimesheetRecordsComponent } from './timesheet-records/timesheet-records.component';


const routes: Routes = [
  {
    path: 'list-timesheet',
    component: TimesheetRecordsComponent,
    
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
  declarations: [TimesheetRecordsComponent]

})
export class TimesheetModule { }
