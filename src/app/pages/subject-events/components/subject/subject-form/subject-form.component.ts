import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/authentication/user.model';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { SubjectService } from 'src/app/core/services/subject/subject.service';
import { AuthActions } from 'src/app/pages/authentication/store/auth-action-types';
import { user, fakultaKatedra } from 'src/app/pages/authentication/store/auth.selectors';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subject: SubjectModel = new SubjectModel();

  user: UserModel;

  loaded = false;

  subs: Subscription = new Subscription();

  fakultaKatedra$: Observable<string[]>;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.fakultaKatedra$ = this.store.select(fakultaKatedra);

    this.subs.add(this.store.select(user).subscribe(userInStore => {
      this.user = userInStore;
    }));

    this.route.params.subscribe(params => {
      const subjectId = params.subjectId;

      if (subjectId != null) {
        this.getSubject(subjectId);
      } else {
        this.loaded = true;
        this.buildForm();
      }

    });

    // subjectId
  }

  getSubject(subjectId: number): void {
    this.subjectService.getSingle(subjectId).subscribe(res => {
      this.subject = res;
      this.loaded = true;

      if (this.user && this.loaded) {
        this.buildForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  buildForm(): void {
    const fakKat = this.user ? this.subject.id ?
      this.subject.fakultaKatedra : (this.user.activeStagUserInfo.fakulta + '/' + this.user.activeStagUserInfo.katedra) : '';

    this.form = this.formBuilder.group({
      name: [this.subject.name, Validators.required],
      fakultaKatedra: [fakKat, Validators.required],
      description: [this.subject.description, [Validators.maxLength(1000)]],
    });
  }

  submitForm(): void {
    this.triggerFormValidation();

    if (this.form.valid) {
      this.loaded = false;

      if (this.subject.id) {
        this.updateSubject(this.form.value);
      } else {
        this.createSubject(this.form.value);
      }
    }
  }

  createSubject(subject: SubjectModel): void {
    subject.fakulta = subject.fakultaKatedra.split('/')[0];
    subject.katedra = subject.fakultaKatedra.split('/')[1];

    this.subjectService.create(subject).subscribe(() => {
      this.back();
    });
  }

  back(): void {
    const navState: any = this.location.getState();

    if (navState.navigationId === 1) {
      this.router.navigateByUrl('admin/subjects');
    } else {
      this.location.back();
    }
  }

  updateSubject(subject: SubjectModel): void {
    subject.id = this.subject.id;
    subject.fakulta = subject.fakultaKatedra.split('/')[0];
    subject.katedra = subject.fakultaKatedra.split('/')[1];


    this.subjectService.update(subject).subscribe(() => {
      this.back();
    });
  }

  triggerFormValidation(): void {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].updateValueAndValidity();
    }
  }

}
