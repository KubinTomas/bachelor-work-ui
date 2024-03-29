import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AuthActions } from "src/app/pages/authentication/store/auth-action-types";
import { AppState } from "src/app/store/app.reducer";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private store: Store<AppState>
    ) {

    }
    canActivate(): Observable<boolean> {
        return this.authenticationService.isAuthorize()
            .pipe(
                map(response => response),
                catchError(error => {
                    this.store.dispatch(AuthActions.logout());
                    return of(false);
                })
            );
    }
}
