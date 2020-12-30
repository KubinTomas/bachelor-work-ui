import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { SubjectService } from 'src/app/core/services/subject/subject.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit {

  @Input() subjects: SubjectModel[];
  @Input() dataLoading: boolean;

  constructor(
    private router: Router,
    private modal: NzModalService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
  }

  onRowClick(data: SubjectModel): void {
    this.goToSubjectDetail(data.id);
  }

  goToSubjectDetail(id: number): void {
    this.router.navigateByUrl('subjects/detail/' + id);
  }

  onDeleteClick(subject: SubjectModel): void {
    this.showDeleteConfirm(subject);
  }

  showDeleteConfirm(subject: SubjectModel): void {
    const title = 'Smazat <b>' + subject.fakultaKatedra + ' - ' + subject.name + '</b>?';
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

  deleteSubject(subject: SubjectModel): void {
    this.subjectService.delete(subject.id).subscribe(() => {
      this.subjects = this.subjects.filter(c => c.id !== subject.id);
    });
  }
}
