import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { SubjectPageComponent } from './components/subject/subject-page/subject-page.component';
import { SubjectsListComponent } from './components/subject/subject-list/subject-list.component';
import { SubjectListSingleComponent } from './components/subject/subject-list-single/subject-list-single.component';
import { SubjectTableComponent } from './components/subject/subject-table/subject-table.component';
import { SubjectDetailPageComponent } from './components/subject/subject-detail-page/subject-detail-page.component';
import { SubjectDetailPageLoaderComponent } from './components/subject/subject-detail-page-loader/subject-detail-page-loader.component';
import { SubjectInYearTableComponent } from './components/subject-in-year/subject-in-year-table/subject-in-year-table.component';
import { SubjectInYearFormComponent } from './components/subject-in-year/subject-in-year-form/subject-in-year-form.component';
import { SubjectFormComponent } from './components/subject/subject-form/subject-form.component';
import { SubjectInYearDetailPageComponent } from './components/subject-in-year/subject-in-year-detail-page/subject-in-year-detail-page.component';
import { SubjectInYearBlockTableComponent } from './components/subject-in-year-term-block/subject-in-year-block-table/subject-in-year-block-table.component';
import { SubjectInYearBlockFormComponent } from './components/subject-in-year-term-block/subject-in-year-block-form/subject-in-year-block-form.component';
import { SubjectInYearTermTableComponent } from './components/subject-in-year-term/subject-in-year-term-table/subject-in-year-term-table.component';
import { SubjectInYearTermDetailPageComponent } from './components/subject-in-year-term/subject-in-year-term-detail-page/subject-in-year-term-detail-page.component';
import { SubjectInYearTermFormComponent } from './components/subject-in-year-term/subject-in-year-term-form/subject-in-year-term-form.component';
import { TermStagConnectionTableComponent } from './components/term-stag-connection/term-stag-connection-table/term-stag-connection-table.component';
import { TermStagConnectionFormComponent } from './components/term-stag-connection/term-stag-connection-form/term-stag-connection-form.component';
import { FormsModule } from '@angular/forms';
import { BlockWhitelistComponent } from './components/block-whitelist/block-whitelist/block-whitelist.component';



@NgModule({
  declarations: [
    SubjectPageComponent,
    SubjectsListComponent,
    SubjectFormComponent,
    SubjectListSingleComponent,
    SubjectTableComponent,
    SubjectDetailPageComponent,
    SubjectDetailPageLoaderComponent,
    SubjectInYearTableComponent,
    SubjectInYearFormComponent,
    SubjectInYearDetailPageComponent,
    SubjectInYearBlockTableComponent,
    SubjectInYearBlockFormComponent,
    SubjectInYearTermTableComponent,
    SubjectInYearTermDetailPageComponent,
    SubjectInYearTermFormComponent,
    TermStagConnectionTableComponent,
    TermStagConnectionFormComponent,
    BlockWhitelistComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class SubjectEventsModule { }
