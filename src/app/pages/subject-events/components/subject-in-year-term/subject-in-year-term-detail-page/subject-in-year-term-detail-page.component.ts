import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { SubjectInYearTermModel } from 'src/app/core/models/subject/subject-in-year-term.model';
import { BlockService } from 'src/app/core/services/subject/block.service';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';

@Component({
  selector: 'app-subject-in-year-term-detail-page',
  templateUrl: './subject-in-year-term-detail-page.component.html',
  styleUrls: ['./subject-in-year-term-detail-page.component.scss']
})
export class SubjectInYearTermDetailPageComponent implements OnInit {

  term: SubjectInYearTermModel;

  blocks: BlockModel[] = [];
  blocksDataLoading = true;

  constructor(
    private route: ActivatedRoute,
    private termService: SubjectInYearTermService,
    private blockService: BlockService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const termId = params.termId;

      this.term = null;
      this.blocksDataLoading = true;

      this.getTerm(termId);
    });
  }

  getTerm(termId: number): void {
    this.termService.getSingle(termId).subscribe(res => {
      this.term = res;

      this.getBlocks(termId);
    });
  }
  getBlocks(termId: number): void {
    this.blockService.get(termId).subscribe(res => {
      this.blocks = res;
      this.blocksDataLoading = false;
    });
  }
}
