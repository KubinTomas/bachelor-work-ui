import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { ActionService } from 'src/app/core/services/subject/action.service';

@Component({
  selector: 'app-block-action-table',
  templateUrl: './block-action-table.component.html',
  styleUrls: ['./block-action-table.component.scss']
})
export class BlockActionTableComponent implements OnInit {

  @Input() dataLoading: boolean;
  @Input() blockId: number;
  @Input() actions: BlockActionModel[];

  listOfActions: BlockActionModel[];


  listOfColumn = [

    {
      title: 'Jméno',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.name.localeCompare(b.name),
      priority: 1,
    },
    {
      title: 'Datum konání',
      compare: (a: BlockActionModel, b: BlockActionModel) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      priority: 2,

    },
    {
      title: 'Zápis od do',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.attendanceAllowStartDate == 'neomezeno' && b.attendanceAllowStartDate == 'neomezeno' ?
        true : new Date(a.attendanceAllowStartDate).getTime() - new Date(b.attendanceAllowStartDate).getTime(),
      priority: 4,
    },
    {
      title: 'Datum odzápisu',
      compare: (a: BlockActionModel, b: BlockActionModel) =>
        new Date(a.attendanceSignOffEndDate).getTime() - new Date(b.attendanceSignOffEndDate).getTime(),
      priority: 5,
    },
    {
      title: 'Místo',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.location && b.location ? a.location.localeCompare(b.location) : true,
      priority: 6,
    },
    {
      title: 'Viditelná',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.visible == false,
      priority: 7,
    },
    {
      title: 'Externí uživatelé',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.blockActionRestriction.allowExternalUsers == false,
      priority: 8,
    },
    {
      title: 'Stag studenti',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.blockActionRestriction.allowOnlyStudentsOnWhiteList == false,
      priority: 9,
    }, {
      title: 'Přihlášeno',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.signedUsersCount - b.signedUsersCount,
      priority: 10,
    }, {
      title: 'Fronta',
      compare: (a: BlockActionModel, b: BlockActionModel) => a.usersInQueueCount - b.usersInQueueCount,
      priority: 11
    },
    {
      title: 'Akce',
    }

  ];


  constructor(
    private router: Router,
    private modal: NzModalService,
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
  }

  onRowClick(data: BlockActionModel): void {
    this.router.navigateByUrl('admin/action/' + data.id);
  }

  onEditClick(data: BlockActionModel): void {
    // this.router.navigateByUrl('/admin/term/' + data.termId + '/block/edit/' + data.id);
  }

  onDeleteClick(action: BlockActionModel): void {
    this.showDeleteConfirm(action);
  }

  showDeleteConfirm(action: BlockActionModel): void {
    const title = 'Smazat blok<b>' + action.name + '</b>?';
    const content = 'Smazání je nevratný proces, jste si jist?';

    this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'Ano',
      nzOkType: 'danger',
      nzOkDanger: true,
      nzOnOk: () => this.deleteSubject(action),
      nzCancelText: 'Ne',
      nzOnCancel: () => { }
    });
  }

  deleteSubject(action: BlockActionModel): void {
    this.actionService.delete(action.id).subscribe(() => {
      this.actions = this.actions.filter(c => c.id !== action.id);
    });
  }

  onSearchChange(value: string): void {

    if (!this.listOfActions) {
      this.listOfActions = [...this.actions];
    }

    if (!value) {
      this.actions = [...this.listOfActions];
      return;
    }

    this.actions = this.listOfActions.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      || (c.location && c.location.toLowerCase().indexOf(value.toLowerCase()) > -1)
    );
  }

}
