import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { ShowDatePipe } from 'src/pipes/show-date.pipe';
import { SafePipe } from 'src/pipes/safe.pipe';
import { SharedModule } from 'src/shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';


import { MultiSelectModule } from 'primeng/multiselect';

// import {
//   AppAsideModule,
//   AppBreadcrumbModule,
//   AppHeaderModule,
//   AppFooterModule,
//   AppSidebarModule,
// } from '@coreui/angular';


@NgModule({
  // declarations: [],
  imports: [
    CommonModule,
    GoogleChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent,
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          
          {
            path: 'admin',
            loadChildren: () => import('src/pages/admin/admin.module').
              then((({ AdminModule }) => AdminModule))
          },
          {
            path: 'timesheet',
            loadChildren: () => import('src/pages/timesheet/timesheet.module').
              then((({ TimesheetModule }) => TimesheetModule))
          },
          {
            path: 'employee',
            loadChildren: () => import('src/pages/employee/employee.module').
              then((({ EmployeeModule }) => EmployeeModule))
          },
          {
            path: 'desigination',
            loadChildren: () => import('src/pages/desigination/desigination.module').
              then((({ DesiginationModule }) => DesiginationModule))
          },
          {
            path: 'department',
            loadChildren: () => import('src/pages/department/department.module').
              then((({ DepartmentModule }) => DepartmentModule))
          },
          {
            path: 'allocate-project',
            loadChildren: () => import('src/pages/project/project.module').
              then((({ ProjectModule }) => ProjectModule))
          },
          {
            path: 'allocate-task',
            loadChildren: () => import('src/pages/task/task.module').
              then((({ TaskModule }) => TaskModule))
          },
          {
            path: 'allocate-team',
            loadChildren: () => import('src/pages/team/team.module').
              then((({ TeamModule }) => TeamModule))
          },
          {
            path: 'resigination',
            loadChildren: () => import('src/pages/resigination/resigination.module').
              then((({ ResiginationModule }) => ResiginationModule))
          },
          {
            path: 'attendance',
            loadChildren: () => import('src/pages/attendance/attendance.module').
              then((({ AttendanceModule }) => AttendanceModule))
          },
          {
            path: 'allocate-leave',
            loadChildren: () => import('src/pages/leave/leave.module').
              then((({ LeaveModule }) => LeaveModule))
          },
          {
            path: 'allocate-sprint',
            loadChildren: () => import('src/pages/sprints/sprints.module').
              then((({ SprintsModule }) => SprintsModule))
          }

        ],
        // canActivate: [AuthGuard]
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedModule,
    NgxIntlTelInputModule


  ],

  declarations: [DashboardComponent, LandingPageComponent, ProfileComponent]
})


export class HomeModule { }