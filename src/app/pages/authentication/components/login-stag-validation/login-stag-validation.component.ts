import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginModel } from 'src/app/core/models/authentication/login.model';
import { StagLoginQueryParamsModel } from 'src/app/core/models/stag/stag-login-query-params.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { Base64Service } from 'src/app/core/services/utils/base64.service';
import { AppState } from 'src/app/store/app.reducer';
import { AuthActions } from '../../store/auth-action-types';

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
    private notificationToastrService: NotificationToastrService,
    private store: Store<AppState>
  ) {
    this.processQueryParams();

    console.log(this.authenticationService.isAuthenticated());
  }

  ngOnInit(): void {
  }

  processQueryParams(): void {
    const params = { ...this.route.snapshot.queryParams as StagLoginQueryParamsModel };
    params.stagUserInfoEncoded = JSON.parse(this.base64Service.decode(params.stagUserInfo)).stagUserInfo;

    this.handleLoginParams(params);
  }

  handleLoginParams(loginParams: StagLoginQueryParamsModel): void {
    const isAnonymous = this.authenticationService.stagAuthentication.isAnonymous(loginParams);

    console.log(loginParams);

    if (isAnonymous) {
      this.notificationToastrService.loginStagNoAnonymousUsers();
      this.router.navigateByUrl('/login');
    } else {

      this.authenticationService.saveCredentials(loginParams.stagUserTicket);

      this.authenticationService.login(new LoginModel()).subscribe(loginResponse => {
        // , loginParams.stagUserTicket


        this.getUser();
      });
    }
  }
  getUser(): void {
    this.store.dispatch(AuthActions.getUser());
    this.router.navigateByUrl('');
  }
}
