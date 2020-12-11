import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from 'src/app/shared/modules/ng-zorro.module';
import { MainRoutingModule } from './main.routing.module';



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    MainRoutingModule
  ]
})
export class MainModule { }
