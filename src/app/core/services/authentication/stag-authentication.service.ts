import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StagLoginQueryParamsModel } from '../../models/stag/stag-login-query-params.model';
import { stagLoginUrl, stagSuccessRedirectToUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class StagAuthenticationService {

  public get apiCookieName(): string {
    return 'WSCOOKIE';
  }

  public get stagLoginUrl(): string {
    return stagLoginUrl;
  }

  public get stagFullUrl(): string {
    return stagLoginUrl + this.stagSuccessRedirectToUrl;
  }

  public get stagFullUrlEncoded(): string {
    return stagLoginUrl + encodeURIComponent(this.stagSuccessRedirectToUrl);
  }

  public get stagSuccessRedirectToUrl(): string {
    return stagSuccessRedirectToUrl;
  }

  constructor(private cookieService: CookieService) { }

  redirectToStagAuthorization(): void {
    window.location.href = this.stagFullUrlEncoded;
  }

  isAnonymous(loginParams: StagLoginQueryParamsModel): boolean {
    return loginParams.stagUserTicket === 'anonymous';
  }

  isAuthenticated(): boolean {
    return this.cookieService.check(this.apiCookieName) && !!this.cookieService.get(this.apiCookieName);
  }

  authorize(loginParams: StagLoginQueryParamsModel): void {
    // TODO SEND CALL TO BACKEND

    // TODO SAVE USER TO STORE

    // SAVE STAG COOKIE
    this.cookieService.set(this.apiCookieName, loginParams.stagUserTicket);
  }

  setUserCookie(loginParams: StagLoginQueryParamsModel): void {
    this.cookieService.set(this.apiCookieName, loginParams.stagUserTicket);
  }

  logout(): void {
    this.cookieService.delete(this.apiCookieName);
    this.cookieService.delete(this.apiCookieName, '/');
  }

  saveCredentials(stagUserTicket: string): void {
    this.cookieService.set(this.apiCookieName, stagUserTicket, null, '/');
  }
}
