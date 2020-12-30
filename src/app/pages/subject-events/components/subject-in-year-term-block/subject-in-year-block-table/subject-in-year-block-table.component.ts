import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockModel } from 'src/app/core/models/subject/block.model';

@Component({
  selector: 'app-subject-in-year-block-table',
  templateUrl: './subject-in-year-block-table.component.html',
  styleUrls: ['./subject-in-year-block-table.component.scss']
})
export class SubjectInYearBlockTableComponent implements OnInit {

  @Input() blocks: BlockModel[];
  @Input() dataLoading: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRowClick(data: BlockModel): void {
    // this.goToSubjectInYearDetail(data.subjectId, data.id);
  }

  // goToBlockDetail(subjectId: number, subjectInYearId: number): void {
  //   this.router.navigateByUrl('subjects/detail/' + subjectId + '/in-year/' + subjectInYearId);
  // }
}
