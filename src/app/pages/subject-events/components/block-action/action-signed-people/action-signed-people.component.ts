import { Component, Input, OnInit } from '@angular/core';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';

@Component({
  selector: 'app-action-signed-people',
  templateUrl: './action-signed-people.component.html',
  styleUrls: ['./action-signed-people.component.scss']
})
export class ActionSignedPeopleComponent implements OnInit {

  @Input() people: ActionPersonModel[];

  constructor(
    private actionService: ActionService,
    private notificationToastrService: NotificationToastrService,
  ) { }

  ngOnInit(): void {
    console.log(this.people);
  }

  setAttendanceFulfilled(actionPersonModel: ActionPersonModel, fulfilled: boolean): void {

    this.actionService.attendanceFulfilled(actionPersonModel.id, fulfilled).subscribe(person => {

      console.log(person);
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
      this.people = this.people.filter(c => c.id !== id);

      this.notificationToastrService.showSuccess('Uživatel byl vyhozen');
    });
  }
}
