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
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

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
        NzDropDownModule,
        NzCardModule,
        NzTableModule,
        NzBreadCrumbModule,
        NzSpinModule,
        NzDividerModule,
        NzTransButtonModule,
        NzModalModule,
        NzAlertModule,
        NzCheckboxModule,
        NzToolTipModule,
        NzTransferModule,
        NzTagModule,
        NzInputNumberModule,
        NzDatePickerModule,
        NzNotificationModule,
        NzEmptyModule,
        NzPopconfirmModule
    ]
})
export class NgZorroModule { }
