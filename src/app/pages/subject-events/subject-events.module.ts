import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { SubjectPageComponent } from './components/subject/subject-page/subject-page.component';
import { SubjectsListComponent } from './components/subject/subject-list/subject-list.component';
import { SubjectListSingleComponent } from './components/subject/subject-list-single/subject-list-single.component';
import { SubjectTableComponent } from './components/subject/subject-table/subject-table.component';
import { SubjectDetailPageComponent } from './components/subject/subject-detail-page/subject-detail-page.component';
import { SubjectDetailPageLoaderComponent } from './components/subject/subject-detail-page-loader/subject-detail-page-loader.component';
import { SubjectInYearTableComponent } from './components/subject-in-year/subject-in-year-table/subject-in-year-table.component';
import { SubjectInYearFormComponent } from './components/subject-in-year/subject-in-year-form/subject-in-year-form.component';
import { SubjectFormComponent } from './components/subject/subject-form/subject-form.component';




@NgModule({
  declarations: [
    SubjectPageComponent,
    SubjectsListComponent,
    SubjectFormComponent,
    SubjectListSingleComponent,
    SubjectTableComponent,
    SubjectDetailPageComponent,
    SubjectDetailPageLoaderComponent,
    SubjectInYearTableComponent,
    SubjectInYearFormComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SubjectEventsModule { }
