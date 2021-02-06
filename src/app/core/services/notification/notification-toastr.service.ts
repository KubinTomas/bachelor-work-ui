import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationToastrService {

  constructor(
    private toastr: ToastrService,
    private notification: NzNotificationService
  ) { }

  loginStagNoAnonymousUsers(): void {
    this.notification.error('Přihlášení selhalo', 'Přihlášení pod anonymním uživatelem není podporováno.');
  }

  showSuccess(title: string, message: string, duration: number = 2000): void {
    this.notification.success(title, message, { nzDuration: duration });
  }

  showWarning(title: string, message: string, duration: number = 2000): void {
    this.notification.warning(title, message, { nzDuration: duration });
  }
}
