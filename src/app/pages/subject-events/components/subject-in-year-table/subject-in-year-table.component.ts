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
  //  this.goToSubjectDetail(data.id);
  }

  goToSubjectDetail(id: number): void {
    this.router.navigateByUrl('subjects/detail/' + id);
  }
}
