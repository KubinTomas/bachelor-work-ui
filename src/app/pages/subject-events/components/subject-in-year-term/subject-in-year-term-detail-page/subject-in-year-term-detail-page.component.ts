import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockModel } from 'src/app/core/models/subject/block.model';
import { SubjectInYearTermModel } from 'src/app/core/models/subject/subject-in-year-term.model';
import { TermStagConnectionModel } from 'src/app/core/models/subject/term-stag-connection.model';
import { BlockService } from 'src/app/core/services/subject/block.service';
import { StagConnectionService } from 'src/app/core/services/subject/stag-connection.service';
import { SubjectInYearTermService } from 'src/app/core/services/subject/subject-in-year-term.service';
import { UtilsTermService } from 'src/app/core/services/utils/term.service';
import { UtilsYearService } from 'src/app/core/services/utils/year.service';

@Component({
  selector: 'app-subject-in-year-term-detail-page',
  templateUrl: './subject-in-year-term-detail-page.component.html',
  styleUrls: ['./subject-in-year-term-detail-page.component.scss']
})
export class SubjectInYearTermDetailPageComponent implements OnInit {

  term: SubjectInYearTermModel;

  blocks: BlockModel[] = [];
  blocksDataLoading = true;

  connections: TermStagConnectionModel[] = [];
  connectionsDataLoading = true;

  constructor(
    private route: ActivatedRoute,
    private termService: SubjectInYearTermService,
    private blockService: BlockService,
    private stagConnectionService: StagConnectionService,
    private yearService: UtilsYearService,
    private utilsTermService: UtilsTermService
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
      this.getConnections(termId);
    });
  }

  getBlocks(termId: number): void {
    this.blockService.get(termId).subscribe(res => {
      this.blocks = res;
      this.blocksDataLoading = false;
    });
  }

  getConnections(termId: number): void {
    this.stagConnectionService.get(termId).subscribe(res => {
      this.connections = res;
      this.connectionsDataLoading = false;

      this.connections.forEach(c => {
        c.formattedYear = this.yearService.getFormattedYear(Number(c.year));
        c.term = this.utilsTermService.getDisplayTermValueFromStagValue(c.term);
      });

    });
  }
}
