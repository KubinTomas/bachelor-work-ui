import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ConfirmAccountComponent } from './pages/authentication/components/confirm-account/confirm-account.component';
import { ForgetPasswordComponent } from './pages/authentication/components/forget-password/forget-password.component';
import { LoginStagValidationComponent } from './pages/authentication/components/login-stag-validation/login-stag-validation.component';
import { LoginComponent } from './pages/authentication/components/login/login.component';
import { RegisterComponent } from './pages/authentication/components/register/register.component';
import { DefaultComponent } from './pages/main/components/default/default.component';
import { AddActionLinkComponent } from './pages/student/components/actions/add-action-link/add-action-link.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/stag/validation', component: LoginStagValidationComponent },
  { path: 'account/confirm/:guid', component: ConfirmAccountComponent },
  { path: 'account/password-recovery/:guid', component: ForgetPasswordComponent },
  {
    path: 'action/join/:actionId', component: AddActionLinkComponent,
  },
  { path: 'registration', component: RegisterComponent },
  { path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'default', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
