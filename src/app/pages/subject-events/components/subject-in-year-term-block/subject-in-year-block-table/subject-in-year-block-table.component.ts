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

  constructor(
    private router: Router,
    private modal: NzModalService,
    private blockService: BlockService) { }

  ngOnInit(): void {
  }

  onRowClick(data: BlockModel): void {
    // this.goToSubjectInYearDetail(data.subjectId, data.id);
  }

  // goToBlockDetail(subjectId: number, subjectInYearId: number): void {
  //   this.router.navigateByUrl('subjects/detail/' + subjectId + '/in-year/' + subjectInYearId);
  // }

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
}
