import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BlockActionFormComponent } from '../subject-events/components/block-action/block-action-form/block-action-form.component';
import { BlockWhitelistComponent } from '../subject-events/components/block-whitelist/block-whitelist/block-whitelist.component';
import { BlockDetailPageComponent } from '../subject-events/components/subject-in-year-term-block/block-detail-page/block-detail-page.component';
import { SubjectInYearBlockFormComponent } from '../subject-events/components/subject-in-year-term-block/subject-in-year-block-form/subject-in-year-block-form.component';
import { SubjectInYearTermDetailPageComponent } from '../subject-events/components/subject-in-year-term/subject-in-year-term-detail-page/subject-in-year-term-detail-page.component';
import { SubjectInYearTermFormComponent } from '../subject-events/components/subject-in-year-term/subject-in-year-term-form/subject-in-year-term-form.component';
import { SubjectInYearDetailPageComponent } from '../subject-events/components/subject-in-year/subject-in-year-detail-page/subject-in-year-detail-page.component';
import { SubjectInYearFormComponent } from '../subject-events/components/subject-in-year/subject-in-year-form/subject-in-year-form.component';
import { SubjectDetailPageComponent } from '../subject-events/components/subject/subject-detail-page/subject-detail-page.component';
import { SubjectFormComponent } from '../subject-events/components/subject/subject-form/subject-form.component';
import { SubjectPageComponent } from '../subject-events/components/subject/subject-page/subject-page.component';
import { TermStagConnectionFormComponent } from '../subject-events/components/term-stag-connection/term-stag-connection-form/term-stag-connection-form.component';
import { DefaultComponent } from './components/default/default.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent, children: [

            { path: 'admin/subjects', component: SubjectPageComponent },
            { path: 'admin/subjects/create', component: SubjectFormComponent },
            { path: 'admin/subjects/edit/:subjectId', component: SubjectFormComponent },
            { path: 'admin/subjects/detail/:subjectId', component: SubjectDetailPageComponent },

            { path: 'admin/subject/:subjectId/year/create', component: SubjectInYearFormComponent },
            { path: 'admin/subject/:subjectId/year/edit/:subjectInYearId', component: SubjectInYearFormComponent },
            { path: 'admin/subject-year/:subjectInYearId', component: SubjectInYearDetailPageComponent },

            { path: 'admin/term/create/:subjectInYearId', component: SubjectInYearTermFormComponent },
            { path: 'admin/term/detail/:termId', component: SubjectInYearTermDetailPageComponent },
            { path: 'admin/term/:termId/block/create', component: SubjectInYearBlockFormComponent },
            { path: 'admin/term/:termId/block/edit/:blockId', component: SubjectInYearBlockFormComponent },

            { path: 'admin/term/:termId/stag-connection/create', component: TermStagConnectionFormComponent },

            { path: 'admin/block/:blockId/whitelist', component: BlockWhitelistComponent },

            { path: 'admin/action/create/:blockId', component: BlockActionFormComponent },
            { path: 'admin/block/:blockId', component: BlockDetailPageComponent },


            // { path: 'subjects/detail/:subjectId/in-year/:subjectInYearId/block/create', component: SubjectInYearBlockFormComponent },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
