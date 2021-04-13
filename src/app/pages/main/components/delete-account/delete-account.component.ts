import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { AuthActions } from 'src/app/pages/authentication/store/auth-action-types';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  visible = false;
  processing = false;

  password = '';

  constructor(
    private authService: AuthenticationService,
    private store: Store<AppState>,
    private notificationToastrService: NotificationToastrService) { }

  ngOnInit(): void {
  }

  open(): void {
    this.visible = true;
    this.password = '';
  }

  close(): void {
    this.visible = false;

  }

  deleteAccount(): void {
    this.processing = true;


    this.authService.deleteAccount(this.password).subscribe(res => {
      this.notificationToastrService.showSuccess('Účet smazán');
      this.processing = false;

      this.store.dispatch(AuthActions.logout());
    }, (error) => {
      this.processing = false;

      this.notificationToastrService.showError('Nepodařilo se smazat účet');
    });
  }

}
