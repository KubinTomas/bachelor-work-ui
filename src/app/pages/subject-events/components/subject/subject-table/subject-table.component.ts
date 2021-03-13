import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { SubjectService } from 'src/app/core/services/subject/subject.service';
import { ModalService } from 'src/app/core/services/utils/modal.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit {

  @Input() subjects: SubjectModel[];
  listOfSubjects: SubjectModel[];

  @Input() dataLoading: boolean;

  listOfColumn = [
    {
      title: 'Jméno',
      compare: (a: SubjectModel, b: SubjectModel) => a.name.localeCompare(b.name),
      priority: 1
    },
    {
      title: 'Fakulta/katedra',
    },
    {
      title: 'Tvůrce',
      compare: (a: SubjectModel, b: SubjectModel) => a.ucitelName.localeCompare(b.ucitelName),
      priority: 3
    },
    {
      title: 'Vytvořeno',
      compare: (a: SubjectModel, b: SubjectModel) => a.dateIn > b.dateIn,
      priority: 2
    },
    {
      title: 'Akce',

    }
  ];

  constructor(
    private router: Router,
    private modal: NzModalService,
    private subjectService: SubjectService,
  ) {

  }

  ngOnInit(): void {
  }

  onRowClick(data: SubjectModel): void {
    this.goToSubjectDetail(data.id);
  }

  goToSubjectDetail(id: number): void {
    this.router.navigateByUrl('admin/subjects/detail/' + id);
  }

  onDeleteClick(subject: SubjectModel): void {
    this.showDeleteConfirm(subject);
  }

  showDeleteConfirm(subject: SubjectModel): void {
    const title = 'Smazat <b>' + subject.fakultaKatedra + ' - ' + subject.name + '</b>?';
    const content = 'Smazání je nevratný proces, jste si jist? Obsahující data nebudou smazána a můžete přijít o přístup k vytvořeným akcím.';

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

  onSearchChange(value: string): void {

    if (!this.listOfSubjects) {
      this.listOfSubjects = [...this.subjects];
    }

    if (!value) {
      this.subjects = [...this.listOfSubjects];
      return;
    }

    this.subjects = this.listOfSubjects.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      || c.ucitelName.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
}
