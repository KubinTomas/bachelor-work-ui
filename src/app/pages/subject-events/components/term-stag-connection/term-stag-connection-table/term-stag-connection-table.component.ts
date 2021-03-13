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
  @Input() termId: number;

  listOfConnections: TermStagConnectionModel[];

  listOfColumn = [
    {
      title: 'Předmět',
      compare: (a: TermStagConnectionModel, b: TermStagConnectionModel) => a.zkrPredm.localeCompare(b.zkrPredm),
      priority: 1
    },
    {
      title: 'Rok',
      compare: (a: TermStagConnectionModel, b: TermStagConnectionModel) => a.formattedYear.localeCompare(b.formattedYear),
      priority: 2
    },
    {
      title: 'Semestr',
      compare: (a: TermStagConnectionModel, b: TermStagConnectionModel) => a.term.localeCompare(b.term),
      priority: 4
    },
    {
      title: 'Tvůrce',
      compare: (a: TermStagConnectionModel, b: TermStagConnectionModel) => a.ucitelName.localeCompare(b.ucitelName),
      priority: 5
    },
    {
      title: 'Počet studentů',
      compare: (a: TermStagConnectionModel, b: TermStagConnectionModel) => a.pocetStudentu - b.pocetStudentu,
      priority: 6
    },
    {
      title: 'Vytvořeno',
      compare: (a: TermStagConnectionModel, b: TermStagConnectionModel) => new Date(a.dateIn).getTime() - new Date(b.dateIn).getTime(),
      priority: 7
    },
    {
      title: 'Akce',

    }
  ];


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
    const content = 'Smazání je nevratný proces, jste si jist? Obsahující data nebudou smazána a můžete přijít o přístup k vytvořeným akcím.';

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

  onSearchChange(value: string): void {

    if (!this.listOfConnections) {
      this.listOfConnections = [...this.connections];
    }

    if (!value) {
      this.connections = [...this.listOfConnections];
      return;
    }

    this.connections = this.listOfConnections.filter(c => c.zkrPredm.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      c.predmetNazev.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      c.formattedYear.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      c.term.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      c.ucitelName.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
}
