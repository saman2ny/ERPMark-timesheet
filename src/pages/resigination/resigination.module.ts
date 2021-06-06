import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ResiginationListComponent } from './resigination-list/resigination-list.component';



const routes: Routes = [
  {
    path: 'resigination-list',
    component: ResiginationListComponent,

    
  },

];

@NgModule({
  declarations: [ResiginationListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    InfiniteScrollModule,
    DropdownModule,
    AutoCompleteModule,
    MultiSelectModule,
    NgxIntlTelInputModule
    ]
})
export class ResiginationModule { }
