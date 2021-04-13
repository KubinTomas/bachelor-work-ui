import { Component, OnInit } from '@angular/core';
import { StudentBlockActionModel } from 'src/app/core/models/student/student-block-action.model';
import { StudentActionService } from 'src/app/core/services/student/student-action.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { errorActionIsFull, errorActionIsNotFull, ActionBlockRequirementsCompleted, ActionWaitingForAttendanceEvaluation } from 'src/app/core/models/constants';
import { StudentActionPostModel } from 'src/app/core/models/student/student-action-post.model';
import { act } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-actions-table',
  templateUrl: './student-actions-table.component.html',
  styleUrls: ['./student-actions-table.component.scss']
})
export class StudentActionsTableComponent implements OnInit {

  actions: StudentBlockActionModel[] = [];
  actionsData: StudentBlockActionModel[] = [];
  dataLoading = true;

  actionJoinQueue: StudentBlockActionModel;

  actionBlockRequirementsCompleted = ActionBlockRequirementsCompleted;
  actionWaitingForAttendanceEvaluation = ActionWaitingForAttendanceEvaluation;

  studentActionPostModel: StudentActionPostModel = new StudentActionPostModel();

  filterText = '';

  listOfColumn = [
    {
      title: 'Předmět',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) => a.subjectName.localeCompare(b.subjectName),
      priority: 0,
    },
    {
      title: 'Jméno',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) => a.name.localeCompare(b.name),
      priority: 1,
    },
    {
      title: 'Datum konání',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      priority: 2,
    },
    {
      title: 'Datum odzápisu',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) =>
        new Date(a.attendanceSignOffEndDate).getTime() - new Date(b.attendanceSignOffEndDate).getTime(),
      priority: 3,
    },
    {
      title: 'Zápis od do',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) =>
        a.attendanceAllowStartDate == 'neomezeno' && b.attendanceAllowStartDate == 'neomezeno' ?
          true : new Date(a.attendanceAllowStartDate).getTime() - new Date(b.attendanceAllowStartDate).getTime(),
      priority: 4,
    },
    {
      title: 'Místo',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) =>
        a.location && b.location ? a.location.localeCompare(b.location) : true,
      priority: 5,
    },
    {
      title: 'Přihlášeno',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) => a.signedUsersCount - b.signedUsersCount,
      priority: 6,
    },
    {
      title: 'Fronta',
      compare: (a: StudentBlockActionModel, b: StudentBlockActionModel) => a.usersInQueueCount - b.usersInQueueCount,
      priority: 7,
    },
    {
      title: 'Akce',
    },
  ];

  constructor(
    private studentActionService: StudentActionService,
    private notificationToastrService: NotificationToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reloadActions();
  }

  reloadActions(): void {
    this.getActions(this.studentActionPostModel);
  }

  getActions(filter: StudentActionPostModel): void {
    this.dataLoading = true;
    this.studentActionService.get(filter).subscribe(actions => {
      this.actions = actions;

      this.actionsData = [...actions];
      this.dataLoading = false;

      this.filterDataByInputString();
    });
  }

  onRowClick(action: StudentBlockActionModel): void {
    this.router.navigateByUrl('student/action/' + action.id);
  }

  joinAction(action: StudentBlockActionModel): void {
    this.studentActionService.join(action.id).subscribe(joined => {
      if (joined) {
        this.notificationToastrService.showSuccess('Byl jste přihlášen na akci', '');
      } else {
        this.notificationToastrService.showError('Nepodařilo se přihlásit na akci', '');
      }
      this.reloadActions();
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
      this.reloadActions();
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
      this.reloadActions();
    }, (error) => {
      if (error.error === errorActionIsNotFull) {
        this.notificationToastrService.showWarning('Akce má volné místo', 'Přihlášení do fronty se nezdařilo, akce má volnou kapacitu. Prosím opakujte přihlášení na akci.', 5000);
        this.reloadActions();
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

      this.reloadActions();
    });
  }

  onFilterChange(): void {
    this.filterText = '';
    this.reloadActions();
  }

  filterDataByInputString(): void {
    this.actions = [...this.actionsData];

    if (this.filterText === '') {
      return;
    }
    const filter = this.filterText.replace(/ /g, '').toLowerCase();

    this.actions = this.actions.filter(c => c.name.replace(/ /g, '').toLowerCase().indexOf(filter) > -1
      || c.subjectName.replace(/ /g, '').toLowerCase().indexOf(filter) > -1);
  }
}
