import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StagLoginQueryParamsModel } from 'src/app/core/models/stag/stag-login-query-params.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { Base64Service } from 'src/app/core/services/utils/base64.service';

@Component({
  selector: 'app-login-stag-validation',
  templateUrl: './login-stag-validation.component.html',
  styleUrls: ['./login-stag-validation.component.scss']
})
export class LoginStagValidationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private base64Service: Base64Service,
    private authenticationService: AuthenticationService,
    private notificationToastrService: NotificationToastrService
  ) {
    this.processQueryParams();
  }

  ngOnInit(): void {
  }

  processQueryParams(): void {
    const params = { ...this.route.snapshot.queryParams as StagLoginQueryParamsModel };
    params.stagUserInfoEncoded = JSON.parse(this.base64Service.decode(params.stagUserInfo)).stagUserInfo;

    console.log(params);

    this.handleLoginParams(params);
  }

  handleLoginParams(loginParams: StagLoginQueryParamsModel): void {
    const isAnonymous = this.authenticationService.stagAuthentication.isAnonymous(loginParams);

    if (isAnonymous) {
      this.notificationToastrService.loginStagNoAnonymousUsers();
      this.router.navigateByUrl('/login');
    } else {
      this.authenticationService.stagAuthentication.authorize(loginParams);
    }
  }
}
