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



@NgModule({
  declarations: [
    SubjectEventsCalendarComponent,
    SubjectPageComponent,
    SubjectsListComponent,
    SubjectFormComponent,
    SubjectListSingleComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SubjectEventsModule { }
