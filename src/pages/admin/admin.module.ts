import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CompanyComponent } from './company/company.component';
import { LocalComponent } from './local/local.component';
import { RolesComponent } from './roles/roles.component';
import { ThemeComponent } from './theme/theme.component';



const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,

    
  },
  {
    path: 'local',
    component: LocalComponent,

    
  },
  {
    path: 'roles',
    component: RolesComponent,

    
  },
   {
    path: 'theme',
    component: ThemeComponent,

    
  },

];

@NgModule({
  declarations: [CompanyComponent, LocalComponent, RolesComponent, ThemeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class AdminModule { }
