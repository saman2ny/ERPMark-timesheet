import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { DropdownModule } from 'primeng/dropdown';

import {MultiSelectModule} from 'primeng/multiselect';


const routes: Routes = [
  {
    path: 'list-team',
    component: TeamListComponent,

    
  },
  {
    path: 'team-detail',
    component: TeamDetailComponent,

    
  }

];
@NgModule({
  declarations: [TeamListComponent, TeamDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    InfiniteScrollModule
  ]
})
export class TeamModule { }
