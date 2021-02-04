import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { MainRoutingModule } from './main.routing.module';
import { SubjectEventsModule } from '../subject-events/subject-events.module';
import { StudentModule } from '../student/student.module';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    MainRoutingModule,
    SubjectEventsModule,
    StudentModule,
    NgxPermissionsModule.forRoot()

  ]
})
export class MainModule { }
