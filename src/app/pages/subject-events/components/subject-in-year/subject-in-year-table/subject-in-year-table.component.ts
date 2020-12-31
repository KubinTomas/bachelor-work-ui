import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';

@Component({
  selector: 'app-subject-in-year-table',
  templateUrl: './subject-in-year-table.component.html',
  styleUrls: ['./subject-in-year-table.component.scss']
})
export class SubjectInYearTableComponent implements OnInit {

  @Input() subjectInYears: SubjectInYearModel[];
  @Input() dataLoading: boolean;

  constructor(
    private router: Router,
    private modal: NzModalService,
    private subjectInYearService: SubjectInYearService
  ) { }

  ngOnInit(): void {
  }

  onRowClick(data: SubjectInYearModel): void {
    this.goToSubjectInYearDetail(data.subjectId, data.id);
  }

  goToSubjectInYearDetail(subjectId: number, subjectInYearId: number): void {
    this.router.navigateByUrl('/admin/subject-year/' + subjectInYearId);
  }

  onEditClick(subject: SubjectInYearModel): void {
    this.router.navigateByUrl('/admin/subject/' + subject.subjectId + '/year/edit/' + subject.id);
  }

  onDeleteClick(subject: SubjectInYearModel): void {
    this.showDeleteConfirm(subject);
  }

  showDeleteConfirm(subject: SubjectInYearModel): void {
    const title = 'Smazat rok <b>' + subject.name + '</b>?';
    const content = 'Smazání je nevratný proces, jste si jist?';

    this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'Ano',
      nzOkType: 'danger',
      nzOkDanger: true,
      nzOnOk: () => this.deleteSubject(subject),
      nzCancelText: 'Ne',
      nzOnCancel: () => { }
    });
  }

  deleteSubject(subject: SubjectInYearModel): void {
    this.subjectInYearService.delete(subject.id).subscribe(() => {
      this.subjectInYears = this.subjectInYears.filter(c => c.id !== subject.id);
    });
  }

}
