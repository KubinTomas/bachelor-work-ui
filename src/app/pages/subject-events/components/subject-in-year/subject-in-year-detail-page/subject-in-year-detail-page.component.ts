import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';

@Component({
  selector: 'app-subject-in-year-detail-page',
  templateUrl: './subject-in-year-detail-page.component.html',
  styleUrls: ['./subject-in-year-detail-page.component.scss']
})
export class SubjectInYearDetailPageComponent implements OnInit {

  subjectInYear: SubjectInYearModel;
  subjectInYearsDataLoading = true;

  constructor(
    private subjectInYearService: SubjectInYearService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      const subjectInYearId = params.subjectInYearId;

      this.subjectInYear = null;
      this.subjectInYearsDataLoading = true;

      this.getSubjectInYear(subjectInYearId);
    });
  }

  ngOnInit(): void {
  }

  getSubjectInYear(subjectInYearId: number): void {
    this.subjectInYearService.getSingle(subjectInYearId).subscribe(res => {
      this.subjectInYear = res;

    });
  }

  // getSubjectInYears(subjectId: number): void {
  //   this.subjectInYearService.get(subjectId).subscribe(res => {
  //     this.subjectInYears = res;
  //     this.subjectInYearsDataLoading = false;
  //   });
  // }

}
