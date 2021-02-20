import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/authentication/user.model';
import { roleAdmin, roleStudent } from 'src/app/core/models/constants';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NotificationToastrService } from 'src/app/core/services/notification/notification-toastr.service';
import { AuthActions } from 'src/app/pages/authentication/store/auth-action-types';
import { user } from 'src/app/pages/authentication/store/auth.selectors';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {

  user: UserModel;

  isCollapsed = false;

  subs: Subscription = new Subscription();

  roleStudent = roleStudent;
  roleAdmin = roleAdmin;

  constructor(
    private authService: AuthenticationService,
    private store: Store<AppState>,
    private permissionsService: NgxPermissionsService,
    private router: Router,
    private notificationToastrService: NotificationToastrService) {
    this.store.dispatch(AuthActions.getUser());
  }

  ngOnInit(): void {
    this.subs.add(this.store.select(user).subscribe(userInStore => {
      this.user = userInStore;


      if (this.user) {
        const roles = [this.user.activeStagUserInfo.role];

        this.permissionsService.flushPermissions();
        this.permissionsService.loadPermissions(roles);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  consoleLogAboutMe(): void {
    console.log(this.user);
  }

  changeRole(userName: string): void {
    this.authService.changeRole(userName).subscribe(user => {
      this.notificationToastrService.showSuccess('Role byla změněna');
      this.router.navigateByUrl('');
      this.store.dispatch(AuthActions.saveUser({ user }));
    });
  }
}
