import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectOptionModel } from 'src/app/core/models/others/select-option.model';
import { SubjectInYearTermModel } from 'src/app/core/models/subject/subject-in-year-term.model';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';
import { UtilsTermService } from 'src/app/core/services/utils/term.service';

@Component({
  selector: 'app-subject-in-year-term-form',
  templateUrl: './subject-in-year-term-form.component.html',
  styleUrls: ['./subject-in-year-term-form.component.scss']
})
export class SubjectInYearTermFormComponent implements OnInit {

  form: FormGroup;
  subjectInYearTerm: SubjectInYearTermModel = new SubjectInYearTermModel();

  years: string[] = [];

  subjectInYear: SubjectInYearModel;

  loaded = false;

  terms: SelectOptionModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private subjectInYearTermService: SubjectInYearTermService,
    private subjectInYearService: SubjectInYearService,
    private route: ActivatedRoute,
    private termService: UtilsTermService
  ) {
    this.terms = this.termService.terms;
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const subjectInYearId = Number(params.subjectInYearId);

      this.getSubjectInYear(subjectInYearId);
    });

  }

  getSubjectInYear(subjectInYearId: number): void {
    this.subjectInYearService.getSingle(subjectInYearId).subscribe(res => {
      this.subjectInYear = res;

      this.loaded = true;

      this.buildForm();
    });
  }

  buildForm(): void {
    // todo validator ze rok je unikatni
    this.form = this.formBuilder.group({
      term: [this.subjectInYearTerm.term, Validators.required],
    });
  }

  submitForm(): void {
    this.triggerFormValidation();

    if (this.form.valid) {
      if (this.subjectInYearTerm.id) {
        this.updateSubject(this.form.value);
      } else {
        this.createSubject(this.form.value);
      }
    }
  }

  createSubject(subjectInYearTerm: SubjectInYearTermModel): void {
    subjectInYearTerm.subjectId = this.subjectInYear.subjectId;
    subjectInYearTerm.subjectInYearId = this.subjectInYear.id;

    this.subjectInYearTermService.create(subjectInYearTerm).subscribe(() => {
      this.back();
    });
  }

  back(): void {
    const navState: any = this.location.getState();

    if (navState.navigationId === 1) {
      this.router.navigateByUrl('/admin/subject-year/' + this.subjectInYear.id);
    } else {
      this.location.back();
    }
  }

  updateSubject(subjectInYear: SubjectInYearTermModel): void {
    subjectInYear.id = this.subjectInYearTerm.id;
  }

  triggerFormValidation(): void {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
      this.form.controls[i].updateValueAndValidity();
    }
  }

}
