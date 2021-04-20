import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TaskListComponent } from './task-list/task-list.component';


const routes: Routes = [
  {
    path: 'list-task',
    component: TaskListComponent,
     //logesh
    
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
  declarations: [TaskListComponent]
})
export class TaskModule { }
