import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '@app/features/signin/signin.component';
import { SignupComponent } from '@app/features/signup/signup.component';
import { StatusComponent } from '@app/features/status/status.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'status',
    component: StatusComponent,
    data: { showHeader: false, showSidebar: false, showFooter: false },
  },
  {
    path: 'signin',
    component: SigninComponent,
    data: { showHeader: false, showSidebar: false },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { showHeader: false, showSidebar: false },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
