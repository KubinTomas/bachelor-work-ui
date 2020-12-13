import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/authentication/user.model';
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

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs.add(this.store.select(user).subscribe(userInStore => {
      this.user = userInStore;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
