import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectEventsCalendarComponent } from '../subject-events/components/subject-events-calendar/subject-events-calendar.component';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent, children: [
            { path: 'subject-events/calendar', component: SubjectEventsCalendarComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
