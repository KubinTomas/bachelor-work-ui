import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/authentication/user.model';
import { StagAktualniObdobiInfoModel } from 'src/app/core/models/stag-api-kalendar/stag-aktualni-obdobi-info.model';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { StagKalendarService } from 'src/app/core/services/kalendar/stag-kalendar-service';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';
import { SubjectService } from 'src/app/core/services/subject/subject.service';
import { AuthActions } from 'src/app/pages/authentication/store/auth-action-types';
import { user, katedraFakulta } from 'src/app/pages/authentication/store/auth.selectors';
import { AppState } from 'src/app/store/app.reducer';


@Component({
  selector: 'app-subject-in-year-form',
  templateUrl: './subject-in-year-form.component.html',
  styleUrls: ['./subject-in-year-form.component.scss']
})
export class SubjectInYearFormComponent implements OnInit {

  form: FormGroup;
  subjectInYear: SubjectInYearModel = new SubjectInYearModel();

  isCollapsed = false;

  subs: Subscription = new Subscription();

  subjectId: number;

  years: string[] = [];

  akademRok: number;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private subjectInYearService: SubjectInYearService,
    private stagKalendarService: StagKalendarService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.stagKalendarService.get().subscribe(stagAktualniObdobiInfol => {
      this.akademRok = Number(stagAktualniObdobiInfol.akademRok);

      this.years = this.subjectInYearService.getYears(this.akademRok);

      this.buildForm();
    });

    this.route.params.subscribe(params => {
      this.subjectId = Number(params.subjectId);
    });

  }


  buildForm(): void {
    // todo validator ze rok je unikatni
    this.form = this.formBuilder.group({
      name: [this.subjectInYear.name, Validators.required],
      year: [this.subjectInYear.id ? this.subjectInYear.year : this.subjectInYearService.getFormattedYear(this.akademRok), Validators.required],
      description: [this.subjectInYear.description, [Validators.maxLength(1000)]],
    });
  }

  submitForm(): void {
    this.triggerFormValidation();

    if (this.form.valid) {
      if (this.subjectInYear.id) {
        this.updateSubject(this.form.value);
      } else {
        this.createSubject(this.form.value);
      }
    }
  }

  createSubject(subjectInYear: SubjectInYearModel): void {
    subjectInYear.subjectId = this.subjectId;

    this.subjectInYearService.create(subjectInYear).subscribe(() => {
      this.back();
    });
  }

  back(): void {
    const navState: any = this.location.getState();

    if (navState.navigationId === 1) {
      this.router.navigateByUrl('subjects/detail/' + this.subjectId);
    } else {
      this.location.back();
    }
  }

  updateSubject(subjectInYear: SubjectInYearModel): void {
    subjectInYear.id = this.subjectInYear.id;
  }

  triggerFormValidation(): void {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].updateValueAndValidity();
    }
  }

}
