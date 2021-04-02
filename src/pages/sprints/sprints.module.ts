import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SprintListComponent } from './sprint-list/sprint-list.component';


const routes: Routes = [
  {
    path: 'list-sprint',
    component: SprintListComponent,

    
  },

];

@NgModule({
  declarations: [SprintListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
    ]
})
export class SprintsModule { }
