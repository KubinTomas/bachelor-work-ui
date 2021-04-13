import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentBlockActionModel } from 'src/app/core/models/student/student-block-action.model';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { StudentActionService } from 'src/app/core/services/student/student-action.service';
import { errorActionIsFull, errorActionIsNotFull, ActionBlockRequirementsCompleted, ActionWaitingForAttendanceEvaluation } from 'src/app/core/models/constants';
import { joinActionUrl } from 'src/app/core/models/url.model';

@Component({
  selector: 'app-student-action-detail',
  templateUrl: './student-action-detail.component.html',
  styleUrls: ['./student-action-detail.component.scss']
})
export class StudentActionDetailComponent implements OnInit {

  action: StudentBlockActionModel;
  actionJoinQueue: StudentBlockActionModel;

  actionBlockRequirementsCompleted = ActionBlockRequirementsCompleted;
  actionWaitingForAttendanceEvaluation = ActionWaitingForAttendanceEvaluation;

  loaded = false;

  joinActionUrl = '';
  constructor(
    private route: ActivatedRoute,
    private studentActionService: StudentActionService,
    private notificationToastrService: NotificationToastrService
  ) {

    this.route.params.subscribe(params => {
      this.loaded = false;
      this.action = null;

      const actionId = params.actionId;

      if (actionId != null) {
        this.joinActionUrl = joinActionUrl + '/' + actionId;

        this.getAction(actionId);
      }

    });

  }

  reloadAction(): void {
    this.getAction(this.action.id);
  }

  getAction(actionId: number): void {
    this.studentActionService.getSingle(actionId).subscribe(action => {
      this.action = action;
      this.loaded = true;
    }, (error) => {
      this.loaded = true;
      this.notificationToastrService.showError('Akce neexistuje a nebo k ní nemáte přístup', '', 3000);
    });
  }

  ngOnInit(): void {
  }


  joinAction(action: StudentBlockActionModel): void {
    this.studentActionService.join(action.id).subscribe(joined => {
      if (joined) {
        this.notificationToastrService.showSuccess('Byl jste přihlášen na akci', '');
      } else {
        this.notificationToastrService.showError('Nepodařilo se přihlásit na akci', '');
      }
      this.reloadAction();
    }, (error) => {
      if (error.error === errorActionIsFull) {
        this.actionJoinQueue = action;
      }
    });
  }

  leaveAction(actionId: number): void {
    this.studentActionService.leave(actionId).subscribe(res => {
      if (res) {
        this.notificationToastrService.showSuccess('Byl jste odhlášen z akce', '');
      } else {
        this.notificationToastrService.showWarning('Odzápis již není možný', '');
      }
      this.reloadAction();
    });
  }

  onJoinActionQueue(action: StudentBlockActionModel): void {
    this.actionJoinQueue = action;
  }

  joinActionQueue(): void {
    const actionId = this.actionJoinQueue.id;

    this.joinActionQueueCancelModel();

    this.studentActionService.joinQueue(actionId).subscribe(joined => {
      if (joined) {
        this.notificationToastrService.showSuccess('Byl jste přihlášen do fronty', '');
      } else {
        this.notificationToastrService.showError('Nepodařilo se přihlásit do fronty', '');
      }
      this.reloadAction();
    }, (error) => {
      if (error.error === errorActionIsNotFull) {
        this.notificationToastrService.showWarning('Akce má volné místo', 'Přihlášení do fronty se nezdařilo, akce má volnou kapacitu. Prosím opakujte přihlášení na akci.', 5000);
        this.reloadAction();
      }
    });
  }

  joinActionQueueCancelModel(): void {
    this.actionJoinQueue = null;
  }

  leaveActionQueue(actionId: number): void {
    this.studentActionService.leaveQueue(actionId).subscribe(res => {
      if (res) {
        this.notificationToastrService.showSuccess('Byl jste odhlášen z fronty', '');
      } else {
        this.notificationToastrService.showWarning('Odzápis již není možný', '');
      }

      this.reloadAction();
    });
  }
}
