import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, act } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthActions } from './auth-action-types';
import { tap, concatMap, map, catchError, switchMap, mergeMap } from 'rxjs/operators';

import { concat, empty, EMPTY, of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }


    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.user));
            })
        ),
        { dispatch: false }
    );

    // logout$ = createEffect(() =>
    //     this.actions$
    //         .pipe(
    //             ofType(AuthActions.logout),
    //             tap(action => {
    //                 this.authenticationService.logout();
    //             })
    //         ),
    //     { dispatch: false }
    // );

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                concatMap(() => this.authenticationService.logout().pipe(
                    map(user => {
                        return AuthActions.deleteUser();
                    }),
                    catchError(error => {
                        return concat(
                            of(AuthActions.deleteUser())
                        );
                    })
                ))
            ),
        { dispatch: true }
    );

    getUser$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.getUser),
                concatMap(() => this.authenticationService.getUser().pipe(
                    map(user => {
                        return AuthActions.saveUser({ user });
                    }),
                    catchError(error => {
                        return concat(
                            of(AuthActions.logout())
                        );
                    })
                ))
            ),
        { dispatch: true }
    );

    saveUser$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.getUser),
                tap(() => {
                    // this.router.navigateByUrl('');
                })
            ),
        { dispatch: false }
    );


    deleteUser$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.deleteUser),
                tap(() => {
                    this.authenticationService.stagAuthentication.logout();

                    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }})

                    this.router.navigateByUrl('login');
                })
            ),
        { dispatch: false }
    );



    // getUser$ = createEffect(() => this.actions$.pipe(
    //     ofType('[Movies Page] Load Movies'),
    //     mergeMap(() => this.moviesService.getAll()
    //       .pipe(
    //         map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
    //         catchError(() => EMPTY)
    //       ))
    //     )
    //   ));

    // getUser$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActions.getUser),
    //         concatMap(action => {
    //             return concat(
    //                 of(PageLoaderActions.enablePageLoader({ pageLoaderType: PageLoaderTypeEnum.OverlayLoader })),

    //                 this.authService.joinCompany(action.joinCompanyModel.company.id, action.joinCompanyModel.userId).pipe(
    //                     map(res => {
    //                         return AuthActions.joinCompanyAsAdminSuccess({ company: action.joinCompanyModel.company });
    //                     }),
    //                     catchError(error => {
    //                         console.log(action);
    //                         return concat(
    //                             of(PageLoaderActions.disablePageLoader()),
    //                             of(AppErrorHandlingActions.error({ error }))
    //                         );
    //                     })
    //                 )
    //             );
    //         }),
    //     )
    // );

    // joinCompanyAsAdminSuccess$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AuthActions.joinCompanyAsAdminSuccess),
    //         concatMap(() => concat(
    //             of(PageLoaderActions.disablePageLoader()),
    //         ))
    //     );
    // });


    // getUserCompanies$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActions.getUserCompanies),
    //         concatMap(action => {
    //             return concat(
    //                 of(PageLoaderActions.enablePageLoader({ pageLoaderType: PageLoaderTypeEnum.OverlayLoader })),

    //                 this.adminCompanyService.getAll(`${webApiUrl}admin/Company`).pipe(
    //                     map(res => {
    //                         console.log('COMPANIES', res);
    //                         return AuthActions.getUserCompaniesSuccess({ companies: res as CompanyModel[] });
    //                     }),
    //                     catchError(error => {
    //                         console.log(action);
    //                         return concat(
    //                             of(PageLoaderActions.disablePageLoader()),
    //                             of(AppErrorHandlingActions.error({ error }))
    //                         );
    //                     })
    //                 )
    //             );
    //         }),
    //     )
    // );

    // getUserCompaniesSuccess$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AuthActions.getUserCompaniesSuccess),
    //         concatMap(() => concat(
    //             of(PageLoaderActions.disablePageLoader()),
    //         ))
    //     );
    // });

    // userChangeCompany$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AuthActions.userChangeCompany),
    //         concatMap(action => {
    //             return concat(
    //                 of(PageLoaderActions.enablePageLoader({ pageLoaderType: PageLoaderTypeEnum.OverlayLoader })),
    //                 this.authService.changeCompany(action.companyId).pipe(
    //                     map(res => {
    //                         return AuthActions.userChangeCompanySuccess({ user: res });
    //                     }),
    //                     catchError(error => {
    //                         console.log(action);
    //                         return concat(
    //                             of(PageLoaderActions.disablePageLoader()),
    //                             of(AppErrorHandlingActions.error({ error }))
    //                         );
    //                     })
    //                 )
    //             );
    //         }),
    //     )
    // );

    // userChangeCompanySuccess$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AuthActions.userChangeCompanySuccess),
    //         concatMap(action => concat(
    //             of(AuthActions.login({ user: action.user })),
    //             of(PageLoaderActions.disablePageLoader()),
    //         ))
    //     );
    // });

    // resetPasswordSendRequest$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AuthActions.resetPasswordSendRequest),
    //         concatMap(action => {
    //             return concat(
    //                 of(PageLoaderActions.enablePageLoader({ pageLoaderType: PageLoaderTypeEnum.OverlayLoader })),
    //                 this.authService.requestResetPassword(action.email).pipe(
    //                     map(() => {
    //                         return AuthActions.resetPasswordSendRequestSuccessful();
    //                     }),
    //                     catchError(error => {
    //                         return concat(
    //                             of(PageLoaderActions.disablePageLoader()),
    //                             of(AppErrorHandlingActions.error({ error }))
    //                         );
    //                     })
    //                 )
    //             );
    //         })
    //     );
    // });

    // resetPasswordSendRequestSuccessful$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AuthActions.resetPasswordSendRequestSuccessful),
    //         switchMap(() => concat(
    //             of(PageLoaderActions.disablePageLoader()),
    //             this.router.navigate(['/auth/confirmation'])
    //         ))
    //     );
    // }, { dispatch: false });

    // resetPasswordSetNewPassword$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AuthActions.resetPasswordSetNewPassword),
    //         concatMap(action => {
    //             return concat(
    //                 of(PageLoaderActions.enablePageLoader({ pageLoaderType: PageLoaderTypeEnum.OverlayLoader })),
    //                 this.authService.resetPassword(action.token, action.password).pipe(
    //                     map(() => {
    //                         return AuthActions.resetPasswordSetNewPasswordSuccessful();
    //                     }),
    //                     catchError(error => {
    //                         return concat(
    //                             of(PageLoaderActions.disablePageLoader()),
    //                             of(AppErrorHandlingActions.error({ error }))
    //                         );
    //                     })
    //                 )
    //             );
    //         })
    //     );
    // });

    // resetPasswordSetNewPasswordSuccessful$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(AuthActions.resetPasswordSetNewPasswordSuccessful),
    //         switchMap(() => concat(
    //             of(PageLoaderActions.disablePageLoader()),
    //             this.router.navigate(['/auth/login'])
    //         ))
    //     );
    // }, { dispatch: false });
}
