import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
@NgModule({
    declarations: [],
    exports: [
        NzLayoutModule,
        NzMenuModule,
        NzSelectModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        IconsProviderModule,
        NzPageHeaderModule,
        NzDropDownModule
    ]
})
export class NgZorroModule { }
