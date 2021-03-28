import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { StudentGuard } from 'src/app/core/guards/student.guard';
import { roleAdmin, roleStudent } from 'src/app/core/models/constants';
import { StudentActionDetailComponent } from '../student/components/actions/student-action-detail/student-action-detail.component';
import { StudentActionsTableComponent } from '../student/components/actions/student-actions-table/student-actions-table.component';
import { AddActionLinkComponent } from '../student/components/actions/add-action-link/add-action-link.component';
import { BlockActionDetailComponent } from '../subject-events/components/block-action/block-action-detail/block-action-detail.component';
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
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
    {
        path: '', component: DefaultComponent, children: [
            // canActivateChild: [AuthGuard],
            {
                path: 'student/actions', component: StudentActionsTableComponent,
                canActivate: [StudentGuard]
            },

            {
                path: 'student/action/:actionId', component: StudentActionDetailComponent,
                canActivate: [StudentGuard]
            },

      
            {
                path: 'admin/subjects', component: SubjectPageComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subjects/create', component: SubjectFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subjects/edit/:subjectId', component: SubjectFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subjects/detail/:subjectId', component: SubjectDetailPageComponent,
                canActivate: [AdminGuard]
            },

            {
                path: 'admin/subject/:subjectId/year/create', component: SubjectInYearFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subject/:subjectId/year/edit/:subjectInYearId', component: SubjectInYearFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subject-year/:subjectInYearId', component: SubjectInYearDetailPageComponent,
                canActivate: [AdminGuard]
            },

            {
                path: 'admin/term/create/:subjectInYearId', component: SubjectInYearTermFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/term/detail/:termId', component: SubjectInYearTermDetailPageComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/term/:termId/block/create', component: SubjectInYearBlockFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/term/:termId/block/edit/:blockId', component: SubjectInYearBlockFormComponent,
                canActivate: [AdminGuard]
            },

            {
                path: 'admin/term/:termId/stag-connection/create', component: TermStagConnectionFormComponent,
                canActivate: [AdminGuard]
            },

            {
                path: 'admin/block/:blockId/whitelist', component: BlockWhitelistComponent,
                canActivate: [AdminGuard]
            },

            {
                path: 'admin/action/create/:blockId', component: BlockActionFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/action/create/:blockId/:actionId', component: BlockActionFormComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/block/:blockId', component: BlockDetailPageComponent,
                canActivate: [AdminGuard]
            },

            {
                path: 'admin/action/:actionId', component: BlockActionDetailComponent,
                canActivate: [AdminGuard]
            },



            { path: '', component: WelcomePageComponent },

            // { path: 'subjects/detail/:subjectId/in-year/:subjectInYearId/block/create', component: SubjectInYearBlockFormComponent },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
