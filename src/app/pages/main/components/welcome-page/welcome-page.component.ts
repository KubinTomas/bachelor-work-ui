import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { constants } from 'buffer';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { roleAdmin, roleStudent } from 'src/app/core/models/constants';
import { user } from 'src/app/pages/authentication/store/auth.selectors';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();

  isAdmin = false;
  isStudent = false;

  constructor(
    private store: Store<AppState>,
    private permissionsService: NgxPermissionsService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.subs.add(this.store.select(user).subscribe(userInStore => {

      if (userInStore) {
        this.permissionsService.hasPermission(roleAdmin).then(res => {
          this.isAdmin = res;
        });

        this.permissionsService.hasPermission(roleStudent).then(res => {
          this.isStudent = res;
        });
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
