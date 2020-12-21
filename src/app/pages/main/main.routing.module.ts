import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SubjectEventsCalendarComponent } from '../subject-events/components/subject-events-calendar/subject-events-calendar.component';
import { SubjectFormComponent } from '../subject-events/components/subject-form/subject-form.component';
import { SubjectPageComponent } from '../subject-events/components/subject-page/subject-page.component';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent, children: [
            { path: 'subject-events/calendar', component: SubjectEventsCalendarComponent },
            { path: 'subjects', component: SubjectPageComponent },
            { path: 'subjects/create', component: SubjectFormComponent },
            { path: 'subjects/edit', component: SubjectFormComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
