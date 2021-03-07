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
  @Input() subjectId: number;
  @Input() dataLoading: boolean;

  listOfSubjectInYears: SubjectInYearModel[];

  
  listOfColumn = [
    {
      title: 'Rok',
      compare: (a: SubjectInYearModel, b: SubjectInYearModel) => a.year.localeCompare(b.year),
      priority: 1
    },
    {
      title: 'Jméno',
      compare: (a: SubjectInYearModel, b: SubjectInYearModel) => a.name.localeCompare(b.name),
      priority: 2
    },
    {
      title: 'Tvůrce',
      compare: (a: SubjectInYearModel, b: SubjectInYearModel) => a.ucitelName.localeCompare(b.ucitelName),
      priority: 4
    },
    {
      title: 'Vytvořeno',
      compare: (a: SubjectInYearModel, b: SubjectInYearModel) => a.dateIn > b.dateIn,
      priority: 3
    },
    {
      title: 'Akce',

    }
  ];

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

  onNewYearClick(): void {
    this.router.navigateByUrl('/admin/subject/' + this.subjectId + '/year/create');
  }


  onSearchChange(value: string): void {

    if (!this.listOfSubjectInYears) {
      this.listOfSubjectInYears = [...this.subjectInYears];
    }

    if (!value) {
      this.subjectInYears = [...this.listOfSubjectInYears];
      return;
    }

    this.subjectInYears = this.listOfSubjectInYears.filter(c => c.year.toLowerCase().indexOf(value.toLowerCase()) > -1
      || c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      || c.ucitelName.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
  }
}
