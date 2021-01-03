import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from '../../components/page-loader/page-loader.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DeleteIconComponent } from '../../components/delete-icon/delete-icon.component';
import { EditIconComponent } from '../../components/edit-icon/edit-icon.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { IconTextComponent } from '../../components/icon-text/icon-text.component';



@NgModule({
  declarations: [PageLoaderComponent, EditIconComponent, DeleteIconComponent, ConfirmModalComponent, IconTextComponent],
  imports: [
    CommonModule,
    NzSpinModule,
    NzModalModule
  ],
  exports: [PageLoaderComponent, EditIconComponent, DeleteIconComponent, ConfirmModalComponent, IconTextComponent]
})
export class SharedModule { }
