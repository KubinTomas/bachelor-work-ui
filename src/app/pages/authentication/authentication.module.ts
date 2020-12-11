import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { RouterModule } from '@angular/router';
import { LoginStagValidationComponent } from './components/login-stag-validation/login-stag-validation.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginStagValidationComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthenticationModule { }
