import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectEventsCalendarComponent } from './components/subject-events-calendar/subject-events-calendar.component';
import { SubjectPageComponent } from './components/subject-page/subject-page.component';
import { SubjectsListComponent } from './components/subject-list/subject-list.component';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjectListSingleComponent } from './components/subject-list-single/subject-list-single.component';
import { SubjectTableComponent } from './components/subject-table/subject-table.component';
import { SubjectDetailPageComponent } from './components/subject-detail-page/subject-detail-page.component';
import { SubjectDetailPageLoaderComponent } from './components/subject-detail-page-loader/subject-detail-page-loader.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { SubjectInYearTableComponent } from './components/subject-in-year-table/subject-in-year-table.component';
import { SubjectInYearFormComponent } from './components/subject-in-year-form/subject-in-year-form.component';



@NgModule({
  declarations: [
    SubjectEventsCalendarComponent,
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
