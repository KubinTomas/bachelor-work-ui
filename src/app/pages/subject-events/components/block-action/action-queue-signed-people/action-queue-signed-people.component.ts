import { Component, Input, OnInit } from '@angular/core';
import { ActionPersonModel } from 'src/app/core/models/persons/action-person.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { ActionService } from 'src/app/core/services/subject/action.service';

@Component({
  selector: 'app-action-queue-signed-people',
  templateUrl: './action-queue-signed-people.component.html',
  styleUrls: ['./action-queue-signed-people.component.scss']
})
export class ActionQueueSignedPeopleComponent implements OnInit {

  @Input() people: ActionPersonModel[];

  constructor(
    private actionService: ActionService,
    private notificationToastrService: NotificationToastrService,
  ) { }

  ngOnInit(): void {
  }

  kickUser(id: number): void {
    this.actionService.queueKick(id).subscribe(() => {
      this.people = this.people.filter(c => c.id !== id);

      this.notificationToastrService.showSuccess('Uživatel byl vyhozen z fronty');
    });
  }

}
