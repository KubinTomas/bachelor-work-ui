import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from '../../components/page-loader/page-loader.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';



@NgModule({
  declarations: [PageLoaderComponent],
  imports: [
    CommonModule,
    NzSpinModule
  ],
  exports: [PageLoaderComponent]
})
export class SharedModule { }
