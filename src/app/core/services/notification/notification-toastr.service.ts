import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationToastrService {

  constructor(private toastr: ToastrService) { }

  loginStagNoAnonymousUsers(): void {
    this.toastr.error('Přihlášení pod anonymním uživatelem není podporováno.', 'Přihlášení selhalo');
  }
}
