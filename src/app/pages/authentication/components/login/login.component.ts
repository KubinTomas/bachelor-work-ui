import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModel } from 'src/app/core/models/authentication/login.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { AppState } from 'src/app/store/app.reducer';
import { AuthActions } from '../../store/auth-action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  processingForm = false;

  loginFailed = false;

  forgetPasswordModalOkLoading = false;
  forgetPasswordModalVisible = false;
  forgetPasswordEmail = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private router: Router,
    private toastrNotificationService: NotificationToastrService,

  ) {
  }

  submitForm(): void {
    this.validateForm();

    if (this.form.valid) {
      this.login(this.form.value);
    }
  }

  login(loginModel: LoginModel): void {
    this.processingForm = true;
    this.authenticationService.login(loginModel).subscribe(() => {
      this.getUser();
    }, (error) => {
      this.loginFailed = true;
      this.processingForm = false;
    });
  }

  getUser(): void {
    this.store.dispatch(AuthActions.getUser());
    this.router.navigateByUrl('');
  }

  validateForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }



  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  onStagLoginClick(): void {
    this.authenticationService.stagAuthentication.redirectToStagAuthorization();
  }

  onForgetPasswordClick(): void {
    this.forgetPasswordModalVisible = true;
    this.forgetPasswordModalOkLoading = false;
  }

  forgetPasswordHandleOk(): void {
    this.forgetPasswordModalOkLoading = true;
    this.authenticationService.sendRecoverPassword(this.forgetPasswordEmail).subscribe(() => {
      this.toastrNotificationService.showSuccess('Email s pokyny pro obnovení hesla byl odeslán');
      this.forgetPasswordModalVisible = false;
      this.forgetPasswordModalOkLoading = false;
    }, (error) => {
      this.forgetPasswordModalOkLoading = false;
    });
  }

  forgetPasswordHandleCancel(): void {
    this.forgetPasswordModalVisible = false;
  }
}
