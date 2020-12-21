import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectEventsCalendarComponent } from './components/subject-events-calendar/subject-events-calendar.component';
import { SubjectPageComponent } from './components/subject-page/subject-page.component';
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';



@NgModule({
  declarations: [SubjectEventsCalendarComponent, SubjectPageComponent, SubjectsListComponent],
  imports: [
    CommonModule,
    NgZorroModule
  ]
})
export class SubjectEventsModule { }
