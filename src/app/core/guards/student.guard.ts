import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AuthActions } from "src/app/pages/authentication/store/auth-action-types";
import { AppState } from "src/app/store/app.reducer";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { catchError, map } from 'rxjs/operators';
import { NgxPermissionsService } from "ngx-permissions";
import { roleAdmin, roleStudent } from "../models/constants";


@Injectable()
export class StudentGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private store: Store<AppState>,
        private permissionsService: NgxPermissionsService
    ) {

    }
    canActivate(): Promise<boolean> {
        return new Promise((resolve) => {

            const permissions = this.permissionsService.getPermissions();

            if (Object.keys(permissions).length === 0) {
                this.authenticationService.isStudent().then(res => {
                    if (!res) {
                        this.router.navigateByUrl('');
                    }
                    resolve(res);
                }, (error) => {
                    this.router.navigateByUrl('');
                    resolve(false);
                });
            } else {
                this.permissionsService.hasPermission(roleStudent).then(res => {
                    if (!res) {
                        this.router.navigateByUrl('');
                    }
                    resolve(res);
                });
            }
        });
    }
}
