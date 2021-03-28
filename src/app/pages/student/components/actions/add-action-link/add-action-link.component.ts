import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { errorActionIsFull, errorActionIsNotFull } from 'src/app/core/models/constants';
import { StudentBlockActionModel } from 'src/app/core/models/student/student-block-action.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { StudentActionService } from 'src/app/core/services/student/student-action.service';

@Component({
  selector: 'app-add-action-link',
  templateUrl: './add-action-link.component.html',
  styleUrls: ['./add-action-link.component.scss']
})
export class AddActionLinkComponent implements OnInit {

  action: StudentBlockActionModel;
  actionJoinQueue: StudentBlockActionModel;


  processing = true;
  isLoggedIn = false;
  isStudent = true;
  actionError = false;
  success = false;

  actionId: number;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private studentActionService: StudentActionService,
    private notificationToastrService: NotificationToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {


      const actionId = params.actionId;

      if (actionId) {
        console.log("asd");
        this.authenticationService.isAuthorize().subscribe(res => {
          console.log("asd");
          this.isLoggedIn = true;
          this.checkIfIsStudent(actionId);
        }, (error) => {
          this.isLoggedIn = false;
          this.processing = false;
        });
      }

    });

  }


  getAction(actionId: number): void {
    this.studentActionService.getSingle(actionId).subscribe(action => {
      this.action = action;
      this.processing = false;
      console.log(this.action);

    }, (error) => {
      this.processing = false;
      this.actionError = true;
      this.notificationToastrService.showError('Akce neexistuje a nebo k ní nemáte přístup', '', 3000);
    });
  }

  onJoinActionClick(): void {
    this.processing = true;

    this.joinAction(this.action);
  }


  checkIfIsStudent(actionId: number): void {
    this.authenticationService.isStudent().then(res => {

      if (res) {
        this.getAction(actionId);
      } else {
        this.isStudent = false;
        this.processing = false;
      }

    }, (error) => {
      this.isStudent = false;
      this.processing = false;
    });
  }


  joinAction(action: StudentBlockActionModel): void {
    this.studentActionService.join(action.id).subscribe(joined => {
      if (joined) {
        this.notificationToastrService.showSuccess('Byl jste přihlášen na akci', '');
        this.processing = false;
        this.success = true;
      } else {
        this.notificationToastrService.showError('Nepodařilo se přihlásit na akci', '');
      }
    }, (error) => {
      if (error.error === errorActionIsFull) {
        this.actionJoinQueue = action;
      } 
    });
  }

  joinActionQueue(): void {
    const actionId = this.actionJoinQueue.id;

    this.joinActionQueueCancelModel();

    this.studentActionService.joinQueue(actionId).subscribe(joined => {
      if (joined) {
        this.notificationToastrService.showSuccess('Byl jste přihlášen do fronty', '');
        this.processing = false;
        this.success = true;
      } else {
        this.notificationToastrService.showError('Nepodařilo se přihlásit do fronty', '');
      }
    }, (error) => {
      if (error.error === errorActionIsNotFull) {
        this.notificationToastrService.showWarning('Akce má volné místo', 'Přihlášení do fronty se nezdařilo, akce má volnou kapacitu. Prosím opakujte přihlášení na akci.', 5000);
      }
    });
  }

  joinActionQueueCancelModel(): void {
    this.actionJoinQueue = null;
  }

}
