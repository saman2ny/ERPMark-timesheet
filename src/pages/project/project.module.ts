import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path: 'list-project',
    component: ProjectListComponent,

    
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
  declarations: [ProjectListComponent]
})
export class ProjectModule { }
