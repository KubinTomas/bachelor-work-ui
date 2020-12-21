import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/authentication/user.model';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { AuthActions } from 'src/app/pages/authentication/store/auth-action-types';
import { user, katedry } from 'src/app/pages/authentication/store/auth.selectors';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subject: SubjectModel;

  user: UserModel;

  isCollapsed = false;

  subs: Subscription = new Subscription();

  katedry$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.subject = new SubjectModel();
  }

  ngOnInit(): void {
    this.katedry$ = this.store.select(katedry);

    this.subs.add(this.store.select(user).subscribe(userInStore => {
      this.user = userInStore;

      if (this.user) {
        this.buildForm();
      }

    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.subject.name, Validators.required],
      katedra: [this.subject.katedra, Validators.required],
      description: [this.subject.description, [Validators.maxLength(1000)]],
    });
  }

  submitForm(): void {
    this.triggerFormValidation();

    if (this.form.valid) {
      if (this.subject.id) {
        this.updateSubject(this.form.value);
      } else {
        this.createSubject(this.form.value);
      }
    }
  }

  createSubject(subject: SubjectModel): void {
    console.log(subject);
  }

  updateSubject(subject: SubjectModel): void {
    subject.id = this.subject.id;
  }

  triggerFormValidation(): void {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].updateValueAndValidity();
    }
  }

}
