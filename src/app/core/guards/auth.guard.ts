import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthActions } from "src/app/pages/authentication/store/auth-action-types";
import { AppState } from "src/app/store/app.reducer";
import { AuthenticationService } from "../services/authentication/authentication.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
         private authenticationService: AuthenticationService,
         private store: Store<AppState>
         ) {

    }

    canActivate(): boolean {
        const isAuthenticated = this.authenticationService.isAuthenticated();

        if (!isAuthenticated) {
            this.store.dispatch(AuthActions.logout());
        }

        return isAuthenticated;
    }
}
