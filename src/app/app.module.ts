import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cs_CZ, NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { NgZorroModule } from './shared/modules/ng-zorro.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtModule } from '@auth0/angular-jwt';
import { apiUrl } from './core/models/url.model';
import { DefaultInterceptor } from './core/interceptors/default.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { MainModule } from './pages/main/main.module';

registerLocaleData(en);

export function tokenGetter(): string {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    NgZorroModule,
    RouterModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      // runtimeChecks: {
      //   strictStateImmutability: true,
      //   strictActionImmutability: true
      // }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [apiUrl, "localhost:50466"],
      }
    }),
    MainModule
  ],
  providers: [
    AuthGuard,
    { provide: NZ_I18N, useValue: cs_CZ },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
