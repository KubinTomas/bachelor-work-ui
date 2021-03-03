import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModel } from 'src/app/core/models/authentication/login.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private router: Router
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
}
