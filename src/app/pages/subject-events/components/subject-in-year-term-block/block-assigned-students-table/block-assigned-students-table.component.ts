import { Component, Input, OnInit } from '@angular/core';
import { StudentBlockModel } from 'src/app/core/models/student/student-block.model';

@Component({
  selector: 'app-block-assigned-students-table',
  templateUrl: './block-assigned-students-table.component.html',
  styleUrls: ['./block-assigned-students-table.component.scss']
})
export class BlockAssignedStudentsTableComponent implements OnInit {

  @Input() dataLoading: boolean;
  @Input() students: StudentBlockModel[];


  constructor() { }

  ngOnInit(): void {
  }

}
