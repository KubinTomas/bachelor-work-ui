import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { AuthActions } from './pages/authentication/store/auth-action-types';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;


  constructor(private authenticationService: AuthenticationService, private store: Store<AppState>) {
    if (this.authenticationService.isAuthenticated()) {
      this.store.dispatch(AuthActions.getUser());
    }
  }
}
