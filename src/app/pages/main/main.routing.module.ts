import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SubjectInYearBlockFormComponent } from '../subject-events/components/subject-in-year-term-block/subject-in-year-block-form/subject-in-year-block-form.component';
import { SubjectInYearTermFormComponent } from '../subject-events/components/subject-in-year-term/subject-in-year-term-form/subject-in-year-term-form.component';
import { SubjectInYearDetailPageComponent } from '../subject-events/components/subject-in-year/subject-in-year-detail-page/subject-in-year-detail-page.component';
import { SubjectInYearFormComponent } from '../subject-events/components/subject-in-year/subject-in-year-form/subject-in-year-form.component';
import { SubjectDetailPageComponent } from '../subject-events/components/subject/subject-detail-page/subject-detail-page.component';
import { SubjectFormComponent } from '../subject-events/components/subject/subject-form/subject-form.component';
import { SubjectPageComponent } from '../subject-events/components/subject/subject-page/subject-page.component';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent, children: [

            { path: 'admin/subjects', component: SubjectPageComponent },
            { path: 'admin/subjects/create', component: SubjectFormComponent },
            { path: 'admin/subjects/edit/:subjectId', component: SubjectFormComponent },

            { path: 'subjects/detail/:subjectId', component: SubjectDetailPageComponent },
            { path: 'subjects/detail/:subjectId/year/create', component: SubjectInYearFormComponent },

            { path: 'term/create', component: SubjectInYearTermFormComponent },


            { path: 'subjects/detail/:subjectId/in-year/:subjectInYearId', component: SubjectInYearDetailPageComponent },
            { path: 'subjects/detail/:subjectId/in-year/:subjectInYearId/block/create', component: SubjectInYearBlockFormComponent },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
