import { Component, OnInit } from '@angular/core';
import { StudentBlockActionModel } from 'src/app/core/models/student/student-block-action.model';
import { StudentActionService } from 'src/app/core/services/student/student-action.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { errorActionIsFull, errorActionIsNotFull } from 'src/app/core/models/constants';

@Component({
  selector: 'app-student-actions-table',
  templateUrl: './student-actions-table.component.html',
  styleUrls: ['./student-actions-table.component.scss']
})
export class StudentActionsTableComponent implements OnInit {

  actions: StudentBlockActionModel[] = [];
  dataLoading = true;

  actionJoinQueue: StudentBlockActionModel;

  constructor(
    private studentActionService: StudentActionService,
    private notificationToastrService: NotificationToastrService
  ) { }

  ngOnInit(): void {
    this.getActions();
  }

  getActions(): void {
    this.dataLoading = true;
    this.studentActionService.get().subscribe(actions => {
      this.actions = actions;
      this.dataLoading = false;
    });
  }

  onRowClick(action: StudentBlockActionModel): void {

  }

  joinAction(action: StudentBlockActionModel): void {
    this.studentActionService.join(action.id).subscribe(actions => {
      this.notificationToastrService.showSuccess('Byl jste přihlášen na akci', '');
      this.getActions();
    }, (error) => {
      if (error.error === errorActionIsFull) {
        this.actionJoinQueue = action;
      }
    });
  }

  leaveAction(actionId: number): void {
    this.studentActionService.leave(actionId).subscribe(actions => {
      this.notificationToastrService.showSuccess('Byl jste odhlášen z akce', '');
      this.getActions();
    });
  }

  onJoinActionQueue(action: StudentBlockActionModel): void {
    this.actionJoinQueue = action;
  }

  joinActionQueue(): void {
    const actionId = this.actionJoinQueue.id;

    this.joinActionQueueCancelModel();

    this.studentActionService.joinQueue(actionId).subscribe(actions => {
      this.notificationToastrService.showSuccess('Byl jste přihlášen do fronty', '');
      this.getActions();
    }, (error) => {
      if (error.error === errorActionIsNotFull) {
        this.notificationToastrService.showWarning('Akce má volné místo', 'Přihlášení do fronty se nezdařilo, akce má volnou kapacitu. Prosím opakujte přihlášení na akci.', 5000);
        this.getActions();
      }
    });
  }

  joinActionQueueCancelModel(): void {
    this.actionJoinQueue = null;
  }

  leaveActionQueue(actionId: number): void {
    this.studentActionService.leaveQueue(actionId).subscribe(actions => {
      this.notificationToastrService.showSuccess('Byl jste odhlášen z fronty', '');
      this.getActions();
    });
  }
}
