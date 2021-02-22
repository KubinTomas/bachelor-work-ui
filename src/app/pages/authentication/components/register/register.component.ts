import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/core/validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required]],
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

    console.log(this.form);
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
