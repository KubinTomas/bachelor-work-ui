import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  processing = true;
  confirmed = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private toastrNotificationService: NotificationToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const guid = params.guid;

      if (guid) {
        this.authService.confirmEmail(guid).subscribe(() => {
          this.confirmed = true;
          this.processing = false;

          this.toastrNotificationService.showSuccess("Účet byl potvrzen");
        }, (error) => {
          this.confirmed = false;
          this.processing = false;
          this.toastrNotificationService.showError("Nastala chyba, účet nebyl potvrzen");

        });

      }
    });
  }

}
