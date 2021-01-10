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
  @Input() actions: BlockActionModel[];

  constructor(
    private router: Router,
    private modal: NzModalService,
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
  }

  onRowClick(data: BlockActionModel): void {
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
}
