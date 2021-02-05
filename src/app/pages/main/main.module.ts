import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { MainRoutingModule } from './main.routing.module';
import { SubjectEventsModule } from '../subject-events/subject-events.module';
import { StudentModule } from '../student/student.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StudentGuard } from 'src/app/core/guards/student.guard';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';



@NgModule({
  declarations: [DefaultComponent, WelcomePageComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    MainRoutingModule,
    SubjectEventsModule,
    StudentModule,
    NgxPermissionsModule.forRoot()

  ],
  providers: [StudentGuard, AdminGuard]
})
export class MainModule { }
