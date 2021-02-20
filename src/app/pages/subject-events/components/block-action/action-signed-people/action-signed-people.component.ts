import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';
import { BlockActionModel } from 'src/app/core/models/subject/block-action.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';

@Component({
  selector: 'app-action-signed-people',
  templateUrl: './action-signed-people.component.html',
  styleUrls: ['./action-signed-people.component.scss']
})
export class ActionSignedPeopleComponent implements OnInit {

  @ViewChild(NzTableComponent) table: NzTableComponent;

  @Input() people: ActionPersonModel[];
  @Input() action: BlockActionModel;

  constructor(
    private actionService: ActionService,
    private notificationToastrService: NotificationToastrService,
  ) { }

  ngOnInit(): void {
  }

  setAttendanceFulfilled(actionPersonModel: ActionPersonModel, fulfilled: boolean): void {

    this.actionService.attendanceFulfilled(actionPersonModel.id, fulfilled).subscribe(person => {

      actionPersonModel.fulfilled = person.fulfilled;
      actionPersonModel.evaluationDate = person.evaluationDate;

      if (fulfilled) {
        this.notificationToastrService.showSuccess('Označeno jako splněno', '', 1500);
      } else {
        this.notificationToastrService.showWarning('Označeno jako nesplněno', '', 1500);
      }

    });
  }

  kickUser(id: number): void {
    this.actionService.attendanceKick(id).subscribe(() => {
      this.action.signedUsers = this.action.signedUsers.filter(c => c.id !== id);

      this.notificationToastrService.showSuccess('Uživatel byl vyhozen');
    });
  }
}
