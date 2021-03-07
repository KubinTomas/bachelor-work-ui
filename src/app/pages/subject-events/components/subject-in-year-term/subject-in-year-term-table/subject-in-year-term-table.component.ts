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
  @Input() subjectInYearId: number;

  listOfTerms: SubjectInYearTermModel[];



  listOfColumn = [
    {
      title: 'Semestr',
      compare: (a: SubjectInYearTermModel, b: SubjectInYearTermModel) => a.term.localeCompare(b.term),
      priority: 1
    },
    {
      title: 'Tvůrce',
      compare: (a: SubjectInYearTermModel, b: SubjectInYearTermModel) => a.ucitelName.localeCompare(b.ucitelName),
      priority: 2
    },
    {
      title: 'Vytvořeno',
      compare: (a: SubjectInYearTermModel, b: SubjectInYearTermModel) => new Date(a.dateIn).getTime() - new Date(b.dateIn).getTime(),
      priority: 3
    },
    {
      title: 'Akce',

    }
  ];

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


  onSearchChange(value: string): void {

    if (!this.listOfTerms) {
      this.listOfTerms = [...this.terms];
    }

    if (!value) {
      this.terms = [...this.listOfTerms];
      return;
    }

    this.terms = this.listOfTerms.filter(c => c.term.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      c.ucitelName.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
}
