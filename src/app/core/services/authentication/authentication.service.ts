import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginResponseModel } from '../../models/authentication/login-response.model';
import { LoginModel } from '../../models/authentication/login.model';
import { UserModel } from '../../models/authentication/user.model';
import { UserRegistrationModel } from '../../models/persons/user-registration.model';
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
  saveCredentials(stagUserTicket: string): void {
    this.stagAuthenticationService.saveCredentials(stagUserTicket);
  }

  login(loginModel: LoginModel): Observable<LoginResponseModel> {
    let headers = new HttpHeaders();

    if (loginModel.email) {
      headers = headers.append('email', loginModel.email);
      headers = headers.append('password', loginModel.password);
    }

    return this.httpClient.get<LoginResponseModel>(apiUrl + '/authentication/login', { headers });
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/authentication/logout', null);
  }

  getUser(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(apiUrl + '/authentication/user');
  }

  getUserRole(): Observable<string> {
    return this.httpClient.get<string>(apiUrl + '/authentication/role');
  }

  isStudent(): Promise<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/authentication/role/student').toPromise();
  }

  isAdmin(): Promise<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/authentication/role/administrator').toPromise();
  }

  changeRole(role: string): Observable<UserModel> {
    let headers = new HttpHeaders();
    headers = headers.append('role', role);

    return this.httpClient.get<UserModel>(apiUrl + '/authentication/user/change-role', { headers });
  }

  isAuthorize(): Observable<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/authentication/authorize');
  }

  registerUser(user: UserRegistrationModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/authentication/registration', user);
  }

  isEmailAvailable(email: string): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('email', email);

    return this.httpClient.get<boolean>(apiUrl + '/authentication/email/available', { headers });
  }

  sendConfirmEmail(email: string): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('email', email);

    return this.httpClient.get<boolean>(apiUrl + '/authentication/email/send-confirm', { headers });
  }

  confirmEmail(guid: string): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('guid', guid);

    return this.httpClient.get<boolean>(apiUrl + '/authentication/account/confirm', { headers });
  }

}
