import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/core/validators/password-match.validator';
import { UserRegistrationModel } from 'src/app/core/models/persons/user-registration.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { Router } from '@angular/router';
import { EmailValidators } from 'src/app/core/validators/email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  creatingUser = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastrNotificationService: NotificationToastrService,
    private router: Router,
    private emailValidators: EmailValidators
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [this.emailValidators.isAvailable.bind(this.emailValidators)]],
      passwords: this.formBuilder.group({
        password: [null, [Validators.required, Validators.minLength(6)]],
        passwordConfirm: [null, [Validators.required]],
      }, { validator: PasswordValidator.passwordMatch })
    });
  }

  submitForm(): void {
    this.validateForm();

    if (this.form.invalid) {
      return;
    }

    const user = this.form.value as UserRegistrationModel;
    user.password = this.form.value.passwords.password;

    this.registerUser(user);
  }

  registerUser(user: UserRegistrationModel): void {
    this.creatingUser = true;
    this.authService.registerUser(user).subscribe(() => {
      this.toastrNotificationService.showSuccess('Uživatelský účet byl vytvořen');
      this.router.navigateByUrl('login');
    }, (error) => {
      this.toastrNotificationService.showError('');
      this.creatingUser = false;
    });
  }

  validateForm(): void {
    for (const i in this.form['controls']) {

      if (this.form.controls[i]['controls']) {
        for (const j in this.form.controls[i]['controls']) {
          this.form.controls[i]['controls'][j].markAsDirty();
          this.form.controls[i]['controls'][j].updateValueAndValidity();
        }
      } else {

        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }


  }



}
