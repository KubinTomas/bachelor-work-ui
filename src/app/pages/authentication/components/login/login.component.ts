import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  submitForm(): void {
    this.validateForm();
  }

  validateForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  onStagLoginClick(): void {
    this.authenticationService.stagAuthentication.redirectToStagAuthorization();
  }

  getUser(): void {
    this.authenticationService.getUser().subscribe(res => {
      console.log(res);

    });
  }
}
