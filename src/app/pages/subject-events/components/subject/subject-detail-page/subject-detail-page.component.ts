import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/core/animations/fade-in.animation';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';
import { SubjectModel } from 'src/app/core/models/subject/subject.model';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';
import { SubjectService } from 'src/app/core/services/subject/subject.service';

@Component({
  selector: 'app-subject-detail-page',
  templateUrl: './subject-detail-page.component.html',
  styleUrls: ['./subject-detail-page.component.scss'],
  animations: [fadeIn]
})
export class SubjectDetailPageComponent implements OnInit {

  subject: SubjectModel;
  subjectInYears: SubjectInYearModel[] = [];
  subjectInYearsDataLoading = true;

  constructor(
    private subjectService: SubjectService,
    private subjectInYearService: SubjectInYearService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      const subjectId = params.subjectId;

      this.subject = null;
      this.subjectInYearsDataLoading = true;

      this.getSubject(subjectId);
    });
  }

  ngOnInit(): void {
  }

  getSubject(subjectId: number): void {
    this.subjectService.getSingle(subjectId).subscribe(res => {
      this.subject = res;

      this.getSubjectInYears(subjectId);
    });
  }

  getSubjectInYears(subjectId: number): void {
    this.subjectInYearService.get(subjectId).subscribe(res => {
      this.subjectInYears = res;
      this.subjectInYearsDataLoading = false;
    });
  }

}
