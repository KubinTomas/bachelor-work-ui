import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';

@Component({
  selector: 'app-subject-in-year-table',
  templateUrl: './subject-in-year-table.component.html',
  styleUrls: ['./subject-in-year-table.component.scss']
})
export class SubjectInYearTableComponent implements OnInit {

  @Input() subjectInYears: SubjectInYearModel[];
  @Input() dataLoading: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRowClick(data: SubjectInYearModel): void {
    this.goToSubjectInYearDetail(data.subjectId, data.id);
  }

  goToSubjectInYearDetail(subjectId: number, subjectInYearId: number): void {
    this.router.navigateByUrl('subjects/detail/' + subjectId + '/in-year/' + subjectInYearId);
  }
}
