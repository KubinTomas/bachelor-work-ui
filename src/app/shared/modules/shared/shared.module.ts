import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from '../../components/page-loader/page-loader.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DeleteIconComponent } from '../../components/delete-icon/delete-icon.component';
import { EditIconComponent } from '../../components/edit-icon/edit-icon.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { IconTextComponent } from '../../components/icon-text/icon-text.component';
import { MailModalComponent } from '../../components/mail-modal/mail-modal.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PageLoaderComponent, EditIconComponent, DeleteIconComponent, ConfirmModalComponent, IconTextComponent, MailModalComponent],
  imports: [
    CommonModule,
    NzSpinModule,
    NzModalModule,
    NzSelectModule,
    FormsModule
  ],
  exports: [PageLoaderComponent, EditIconComponent, DeleteIconComponent, ConfirmModalComponent, IconTextComponent,
    MailModalComponent]
})
export class SharedModule { }
