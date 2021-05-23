import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('src/pages/user/user.module')
    .then(({ UserModule }) => UserModule)
  },
  {
    path: 'home',
    loadChildren: () => import('src/pages/home/home.module')
    .then(({ HomeModule }) => HomeModule)
  },
 
  
  { path: '**', redirectTo: '' }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
