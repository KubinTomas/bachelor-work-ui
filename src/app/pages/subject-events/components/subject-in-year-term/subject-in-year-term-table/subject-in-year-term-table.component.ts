import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubjectInYearTermModel } from 'src/app/core/models/subject/subject-in-year-term.model';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';

@Component({
  selector: 'app-subject-in-year-term-table',
  templateUrl: './subject-in-year-term-table.component.html',
  styleUrls: ['./subject-in-year-term-table.component.scss']
})
export class SubjectInYearTermTableComponent implements OnInit {

  @Input() terms: SubjectInYearTermModel[];
  @Input() dataLoading: boolean;

  constructor(
    private router: Router,
    private termService: SubjectInYearTermService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  onRowClick(data: SubjectInYearTermModel): void {
     this.goToTermDetail(data.id);
  }

  goToTermDetail(termId: number): void {
    this.router.navigateByUrl('admin/term/detail/' + termId);
  }

  onDeleteClick(term: SubjectInYearTermModel): void {
    this.showDeleteConfirm(term);
  }

  showDeleteConfirm(term: SubjectInYearTermModel): void {
    const title = 'Smazat <b>' + term.term + '</b> semestr?';
    const content = 'Smazání je nevratný proces, jste si jist?';

    this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'Ano',
      nzOkType: 'danger',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTerm(term),
      nzCancelText: 'Ne',
      nzOnCancel: () => { }
    });
  }

  deleteTerm(term: SubjectInYearTermModel): void {
    this.termService.delete(term.id).subscribe(() => {
      this.terms = this.terms.filter(c => c.id !== term.id);
    });
  }
}
