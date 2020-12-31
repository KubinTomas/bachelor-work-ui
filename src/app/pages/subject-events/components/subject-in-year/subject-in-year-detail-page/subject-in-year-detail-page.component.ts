import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { SubjectInYearTermModel } from 'src/app/core/models/subject/subject-in-year-term.model';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';
import { BlockService } from 'src/app/core/services/subject/block.service';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';

@Component({
  selector: 'app-subject-in-year-detail-page',
  templateUrl: './subject-in-year-detail-page.component.html',
  styleUrls: ['./subject-in-year-detail-page.component.scss']
})
export class SubjectInYearDetailPageComponent implements OnInit {

  subjectInYear: SubjectInYearModel;

  terms: SubjectInYearTermModel[] = [];
  termDataLoading = true;

  constructor(
    private subjectInYearService: SubjectInYearService,
    private subjectInYearTenService: SubjectInYearTermService,
    private blockService: BlockService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      const subjectInYearId = params.subjectInYearId;

      this.subjectInYear = null;

      this.terms = [];
      this.termDataLoading = true;

      this.getSubjectInYear(subjectInYearId);
    });
  }

  ngOnInit(): void {
  }

  getSubjectInYear(subjectInYearId: number): void {
    this.subjectInYearService.getSingle(subjectInYearId).subscribe(res => {
      this.subjectInYear = res;

      this.getTerms(subjectInYearId);
    });
  }

  getTerms(subjectInYearId: number): void {
    this.subjectInYearTenService.get(subjectInYearId).subscribe(res => {
      this.terms = res;
      this.termDataLoading = false;
    });
  }
  // getBlocks(subjectInYearId: number): void {
  //   this.blockService.get(subjectInYearId).subscribe(res => {
  //     this.blocks = res;
  //     this.termDataLoading = false;
  //   });
  // }
}
