import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StudentActionsTableComponent } from './components/actions/student-actions-table/student-actions-table.component';


@NgModule({
  declarations: [

  StudentActionsTableComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class StudentModule { }
