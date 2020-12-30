import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginResponseModel } from '../../models/authentication/login-response.model';
import { LoginModel } from '../../models/authentication/login.model';
import { UserModel } from '../../models/authentication/user.model';
import { apiUrl } from '../../models/url.model';
import { StagAuthenticationService } from './stag-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public get stagAuthentication(): StagAuthenticationService {
    return this.stagAuthenticationService;
  }

  constructor(
    private readonly stagAuthenticationService: StagAuthenticationService,
    private jwtHelper: JwtHelperService,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  // kontrola pokud mam token -> doslo k prihlaseni
  // kontrola zda token je stale platny
  // kontrola pokud token patri stag uzivateli, tak overujeme ze ma platnou cookie pro autorizaci oproti stag api
  isAuthenticated(): boolean {
    // asp cookie je http only, takze ji neprectu
    return false;

    // old jwt auth
    // const token: string = localStorage.getItem('jwt');

    // if (!token || this.jwtHelper.isTokenExpired(token)) {
    //   return false;
    // }

    // const decodedToken = this.jwtHelper.decodeToken(token);
    // const isStagToken = decodedToken.StagToken === 'true';

    // if (isStagToken && !this.stagAuthenticationService.isAuthenticated()) {
    //   return false;
    // }

    // return true;
  }


  isTokenExpired(): boolean {
    const token: string = localStorage.getItem('jwt');

    if (!token) {
      return true;
    }

    return this.jwtHelper.isTokenExpired(token);
  }
  saveCredentials(token: string, stagUserTicket: string): void {
    this.stagAuthenticationService.saveCredentials(stagUserTicket);
  }

  login(loginModel: LoginModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(apiUrl + '/authentication/login', loginModel);
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/authentication/logout', null);
  }

  getUser(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(apiUrl + '/authentication/user');
  }

  isAuthorize(): Observable<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/authentication/authorize');
  }

}
