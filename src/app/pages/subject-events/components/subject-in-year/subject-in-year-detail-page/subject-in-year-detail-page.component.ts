import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { SubjectInYearModel } from 'src/app/core/models/subject/subject-in-year.model';
import { BlockService } from 'src/app/core/services/subject/block.service';
import { SubjectInYearService } from 'src/app/core/services/subject/subject-in-year.service';

@Component({
  selector: 'app-subject-in-year-detail-page',
  templateUrl: './subject-in-year-detail-page.component.html',
  styleUrls: ['./subject-in-year-detail-page.component.scss']
})
export class SubjectInYearDetailPageComponent implements OnInit {

  subjectInYear: SubjectInYearModel;

  blocks: BlockModel[] = [];
  blocksDataLoading = true;

  constructor(
    private subjectInYearService: SubjectInYearService,
    private blockService: BlockService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      const subjectInYearId = params.subjectInYearId;

      this.subjectInYear = null;

      this.blocks = [];
      this.blocksDataLoading = true;

      this.getSubjectInYear(subjectInYearId);
    });
  }

  ngOnInit(): void {
  }

  getSubjectInYear(subjectInYearId: number): void {
    this.subjectInYearService.getSingle(subjectInYearId).subscribe(res => {
      this.subjectInYear = res;

      this.getBlocks(subjectInYearId);
    });
  }

  getBlocks(subjectInYearId: number): void {
    this.blockService.get(subjectInYearId).subscribe(res => {
      this.blocks = res;
      this.blocksDataLoading = false;
    });
  }

}
