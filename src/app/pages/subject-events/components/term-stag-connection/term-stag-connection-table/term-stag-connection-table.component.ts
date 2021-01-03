import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TermStagConnectionModel } from 'src/app/core/models/subject/term-stag-connection.model';
import { StagConnectionService } from 'src/app/core/services/subject/stag-connection.service';

@Component({
  selector: 'app-term-stag-connection-table',
  templateUrl: './term-stag-connection-table.component.html',
  styleUrls: ['./term-stag-connection-table.component.scss']
})
export class TermStagConnectionTableComponent implements OnInit {

  @Input() connections: TermStagConnectionModel[];
  @Input() dataLoading: boolean;

  constructor(
    private router: Router,
    private modal: NzModalService,
    private stagConnectionService: StagConnectionService) { }

  ngOnInit(): void {
  }



  onDeleteClick(block: TermStagConnectionModel): void {
    this.showDeleteConfirm(block);
  }

  showDeleteConfirm(connection: TermStagConnectionModel): void {
    const title = 'Smazat propojení <b>' + connection.zkrPredm + ' - ' + connection.predmetNazev + '</b>?';
    const content = 'Smazání je nevratný proces, jste si jist?';

    this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'Ano',
      nzOkType: 'danger',
      nzOkDanger: true,
      nzOnOk: () => this.deleteSubject(connection),
      nzCancelText: 'Ne',
      nzOnCancel: () => { }
    });
  }

  deleteSubject(connection: TermStagConnectionModel): void {
    this.stagConnectionService.delete(connection.id).subscribe(() => {
      this.connections = this.connections.filter(c => c.id !== connection.id);
    });
  }
}
