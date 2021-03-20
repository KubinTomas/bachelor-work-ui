import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { AuthActions } from 'src/app/pages/authentication/store/auth-action-types';
import { AppState } from 'src/app/store/app.reducer';
import { Unauthorized } from '../models/constants';
import { NotificationToastrService } from '../services/notification/notification-toastr.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
    private toastrNotificationService: NotificationToastrService

  ) { }

  // HttpEvent<any>
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request).pipe(
      catchError((error) => {

        if (error.status === Unauthorized) {
          this.store.dispatch(AuthActions.logout());
          this.toastrNotificationService.showWarning('Přihlašovací relace již vypršela, přihlašte se znovu.');
        }

        console.log('error is intercept');
        console.log(error);
        return throwError(error);
      })
    );
  }
}
