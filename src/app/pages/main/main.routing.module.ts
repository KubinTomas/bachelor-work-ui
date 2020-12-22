import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SubjectInYearDetailPageComponent } from '../subject-events/components/subject-in-year/subject-in-year-detail-page/subject-in-year-detail-page.component';
import { SubjectInYearFormComponent } from '../subject-events/components/subject-in-year/subject-in-year-form/subject-in-year-form.component';
import { SubjectDetailPageComponent } from '../subject-events/components/subject/subject-detail-page/subject-detail-page.component';
import { SubjectFormComponent } from '../subject-events/components/subject/subject-form/subject-form.component';
import { SubjectPageComponent } from '../subject-events/components/subject/subject-page/subject-page.component';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent, children: [
            { path: 'subjects', component: SubjectPageComponent },
            { path: 'subjects/detail/:subjectId', component: SubjectDetailPageComponent },
            { path: 'subjects/detail/:subjectId/year/create', component: SubjectInYearFormComponent },
            { path: 'subjects/create', component: SubjectFormComponent },
            { path: 'subjects/edit', component: SubjectFormComponent },

            { path: 'subjects/detail/:subjectId/in-year/:subjectInYearId', component: SubjectInYearDetailPageComponent },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
