import { Component, OnInit } from '@angular/core';
import { StudentActionService } from 'src/app/core/services/student/student-action.service';

@Component({
  selector: 'app-student-actions-table',
  templateUrl: './student-actions-table.component.html',
  styleUrls: ['./student-actions-table.component.scss']
})
export class StudentActionsTableComponent implements OnInit {

  constructor(private studentActionService: StudentActionService) { }

  ngOnInit(): void {
    this.getActions();
  }

  getActions(): void {
    this.studentActionService.get().subscribe(actions => {
      console.log(actions);
      console.log(actions);
    });
  }

}
