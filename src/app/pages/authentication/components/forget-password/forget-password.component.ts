import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { PasswordValidator } from 'src/app/core/validators/password-match.validator';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  processing = false;
  form: FormGroup;
  guid: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private toastrNotificationService: NotificationToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const guid = params.guid;

      this.guid = guid;
      this.buildForm();
    });
  }

  submitForm(): void {
    this.validateForm();

    if (this.form.invalid) {
      return;
    }

    this.recoverPassword();
  }

  recoverPassword(): void {

    this.processing = true;

    this.authService.recoverPassword(this.guid, this.form.value.passwords.password).subscribe(() => {
      this.toastrNotificationService.showSuccess('Heslo bylo změněno');
      this.router.navigateByUrl('/login');
    }, (error) => {
      this.processing = false;
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      passwords: this.formBuilder.group({
        password: [null, [Validators.required, Validators.minLength(6)]],
        passwordConfirm: [null, [Validators.required]],
      }, { validator: PasswordValidator.passwordMatch })
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
