import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'; 
import { LeaveListComponent } from './leave-list/leave-list.component';



const routes: Routes = [
  {
    path: 'list-leave',
    component:  LeaveListComponent,

    
  },

];
@NgModule({
  declarations: [LeaveListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule

  ]
})
export class LeaveModule { }
