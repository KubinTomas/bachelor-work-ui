import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TermStagConnectionModel } from 'src/app/core/models/subject/term-stag-connection.model';
import { StagKalendarService } from 'src/app/core/services/kalendar/stag-kalendar-service';
import { StagConnectionService } from 'src/app/core/services/subject/stag-connection.service';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';
import { katedryVRoliVyucujici } from 'src/app/pages/authentication/store/auth.selectors';
import { AppState } from 'src/app/store/app.reducer';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';
import { UtilsYearService } from 'src/app/core/services/utils/year.service';
import { StagYearModel } from 'src/app/core/models/others/stag-year.model';
import { UtilsTermService } from 'src/app/core/services/utils/term.service';
import { SelectOptionModel } from 'src/app/core/models/others/select-option.model';
import { StagPredmetModel } from 'src/app/core/models/stag/stag-predmet.model';

@Component({
  selector: 'app-term-stag-connection-form',
  templateUrl: './term-stag-connection-form.component.html',
  styleUrls: ['./term-stag-connection-form.component.scss']
})
export class TermStagConnectionFormComponent implements OnInit {

  termStagConnection: TermStagConnectionModel = new TermStagConnectionModel();

  form: FormGroup;

  departments$: Observable<string[]>;
  years: StagYearModel[] = [];

  terms: SelectOptionModel[];

  subjects: StagPredmetModel[] = [];
  subjectsAllData: StagPredmetModel[] = [];

  akademRok: number;

  subjectsOnceLoaded = false;
  loadingSubjects = false;

  showEmptySubjects = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private stagConnectionService: StagConnectionService,
    private termService: SubjectInYearTermService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private subjectInYearService: SubjectInYearService,
    private stagKalendarService: StagKalendarService,
    private yearService: UtilsYearService,
    private utilsTermsService: UtilsTermService,

  ) {
  }

  ngOnInit(): void {
    this.terms = this.utilsTermsService.terms;

    this.route.params.subscribe(params => {
      this.form = null;

      const termId = Number(params.termId);
      const stagConnectionId = Number(params.stagConnectionId);

      // potrebuji subjectId a subjectInYearId

      if (stagConnectionId) {
        this.getStagConnection(stagConnectionId);
      } else {
        this.getTerm(termId);
      }
    });

    this.departments$ = this.store.select(katedryVRoliVyucujici);

  }

  tryLoadSubjects(): void {
    const formValue = this.form.value as TermStagConnectionModel;

    if (formValue.department && formValue.year && formValue.term) {
      formValue.term = this.utilsTermsService.getStagTermValue(formValue.term);
      this.getSubjects(formValue);
    }
  }

  getSubjects(connection: TermStagConnectionModel): void {
    this.loadingSubjects = true;

    this.stagConnectionService.getSubjects(connection.department, connection.year, connection.term).subscribe(res => {
      this.loadingSubjects = false;
      this.subjectsOnceLoaded = true;

      this.subjects = res;
      this.subjectsAllData = [...this.subjects];

      this.onSubjectFilterChange();
    });
  }

  onSubjectFilterChange(): void {
    this.subjects = [...this.subjectsAllData];

    if (!this.showEmptySubjects) {
      this.subjects = this.subjects.filter(c => c.pocetStudentu !== 0);
    }
  }

  getYears(): void {
    this.stagKalendarService.get().subscribe(stagAktualniObdobiInfol => {
      this.akademRok = Number(stagAktualniObdobiInfol.akademRok);

      this.years = this.yearService.getFormattedYearsComplex(this.akademRok);

      this.buildForm();
    });
  }


  getTerm(termId: number): void {
    this.termService.getSingle(termId).subscribe(term => {

      this.termStagConnection.termId = termId;
      this.termStagConnection.subjectId = term.subjectId;
      this.termStagConnection.subjectInYearId = term.subjectInYearId;

      this.getYears();
    });
  }

  getStagConnection(connectionId: number): void {
    this.stagConnectionService.getSingle(connectionId).subscribe(res => {
      this.termStagConnection = res;

      this.getYears();
    });
  }

  buildForm(): void {
    console.log(this.termStagConnection.id ? this.termStagConnection.formattedYear :
      this.yearService.getFormattedYear(this.akademRok));
    this.form = this.formBuilder.group({
      department: [this.termStagConnection.department, [Validators.required]],
      year: [this.termStagConnection.id ? this.termStagConnection.formattedYear :
        this.yearService.getFormattedYearComplex(this.akademRok).year, [Validators.required]],
      term: [this.termStagConnection.id ? this.termStagConnection.term : this.utilsTermsService.termWholeYear, [Validators.required]],
      zkrPredm: [this.termStagConnection.zkrPredm, [Validators.required]]

    });
  }

  submitForm(): void {
    this.triggerFormValidation();

    if (this.form.valid) {
      if (this.termStagConnection.id) {
        this.updateSubject(this.form.value);
      } else {
        this.createSubject(this.form.value);
      }
    }
  }

  createSubject(connection: TermStagConnectionModel): void {
    connection.termId = this.termStagConnection.termId;
    connection.term = this.utilsTermsService.getStagTermValue(connection.term);

    this.stagConnectionService.create(connection).subscribe(() => {
      this.back();
    });
  }

  back(): void {
    const navState: any = this.location.getState();

    if (navState.navigationId === 1) {
      this.router.navigateByUrl('admin/term/detail/' + this.termStagConnection.termId);
    } else {
      this.location.back();
    }
  }

  updateSubject(connection: TermStagConnectionModel): void {
    connection.id = this.termStagConnection.id;

    this.stagConnectionService.update(connection).subscribe(() => {
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
