import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { RouterModule } from '@angular/router';
import { LoginStagValidationComponent } from './components/login-stag-validation/login-stag-validation.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginStagValidationComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
