import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
    InfiniteScrollModule
    ]
})
export class ResiginationModule { }
