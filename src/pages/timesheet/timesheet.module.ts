import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';


// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DropdownModule,
    AutoCompleteModule,
    MultiSelectModule,
    // NgxIntlTelInputModule
  ],
  declarations: [TimesheetRecordsComponent]

})
export class TimesheetModule { }
