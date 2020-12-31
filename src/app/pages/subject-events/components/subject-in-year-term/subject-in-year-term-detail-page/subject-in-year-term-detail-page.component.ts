import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectInYearTermModel } from 'src/app/core/models/subject/subject-in-year-term.model';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';

@Component({
  selector: 'app-subject-in-year-term-detail-page',
  templateUrl: './subject-in-year-term-detail-page.component.html',
  styleUrls: ['./subject-in-year-term-detail-page.component.scss']
})
export class SubjectInYearTermDetailPageComponent implements OnInit {

  term: SubjectInYearTermModel;

  constructor(
    private route: ActivatedRoute,
    private termService: SubjectInYearTermService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const termId = params.termId;

      this.term = null;

      this.getTerm(termId);
    });
  }

  getTerm(termId: number): void {
    this.termService.getSingle(termId).subscribe(res => {
      this.term = res;
    });
  }

}
