import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { BlockService } from 'src/app/core/services/subject/block.service';

@Component({
  selector: 'app-subject-in-year-block-table',
  templateUrl: './subject-in-year-block-table.component.html',
  styleUrls: ['./subject-in-year-block-table.component.scss']
})
export class SubjectInYearBlockTableComponent implements OnInit {

  @Input() blocks: BlockModel[];
  @Input() dataLoading: boolean;
  @Input() termId: number;

  listOfBlocks: BlockModel[];



  listOfColumn = [
    {
      title: 'Jméno',
      compare: (a: BlockModel, b: BlockModel) => a.name.localeCompare(b.name),
      priority: 1
    },
    {
      title: 'Tvůrce',
      compare: (a: BlockModel, b: BlockModel) => a.ucitelName.localeCompare(b.ucitelName),
      priority: 2
    },
    {
      title: 'Vytvořeno',
      compare: (a: BlockModel, b: BlockModel) => a.dateIn > b.dateIn,
      priority: 4
    },
    {
      title: 'Externí uživatelé',
      compare: (a: BlockModel, b: BlockModel) => a.blockRestriction.allowExternalUsers  == false,
      priority: 5
    },
    {
      title: 'Stag studenti',
      compare: (a: BlockModel, b: BlockModel) => a.blockRestriction.allowOnlyStudentsOnWhiteList == false,
      priority: 6
    },
    {
      title: 'Studenti s přístupem',
      compare: (a: BlockModel, b: BlockModel) => a.whitelistUserCount - b.whitelistUserCount,
      priority: 7
    },
    {
      title: 'Přístupy/splnění',
      compare: (a: BlockModel, b: BlockModel) => a.blockRestriction.actionAttendLimit - b.blockRestriction.actionAttendLimit,
      priority: 8
    },
    {
      title: 'Akce',

    }
  ];

  constructor(
    private router: Router,
    private modal: NzModalService,
    private blockService: BlockService) { }

  ngOnInit(): void {
  }

  onRowClick(data: BlockModel): void {
    this.goToBlockDetail(data.id);
  }

  goToBlockDetail(blockId: number): void {
    this.router.navigateByUrl('/admin/block/' + blockId);
  }

  onEditClick(data: BlockModel): void {
    this.router.navigateByUrl('/admin/term/' + data.termId + '/block/edit/' + data.id);
  }

  onDeleteClick(block: BlockModel): void {
    this.showDeleteConfirm(block);
  }

  onWhitelistClick(data: BlockModel): void {
    this.router.navigateByUrl('/admin/block/' + data.id + '/whitelist');
  }

  showDeleteConfirm(block: BlockModel): void {
    const title = 'Smazat blok<b>' + block.name + '</b>?';
    const content = 'Smazání je nevratný proces, jste si jist?';

    this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'Ano',
      nzOkType: 'danger',
      nzOkDanger: true,
      nzOnOk: () => this.deleteSubject(block),
      nzCancelText: 'Ne',
      nzOnCancel: () => { }
    });
  }

  deleteSubject(block: BlockModel): void {
    this.blockService.delete(block.id).subscribe(() => {
      this.blocks = this.blocks.filter(c => c.id !== block.id);
    });
  }


  onSearchChange(value: string): void {

    if (!this.listOfBlocks) {
      this.listOfBlocks = [...this.blocks];
    }

    if (!value) {
      this.blocks = [...this.listOfBlocks];
      return;
    }

    this.blocks = this.listOfBlocks.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      c.ucitelName.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
}
