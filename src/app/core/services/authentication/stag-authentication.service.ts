import { Injectable } from '@angular/core';
import { StagLoginQueryParamsModel } from '../../models/stag/stag-login-query-params.model';
import { stagLoginUrl, stagSuccessRedirectToUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class StagAuthenticationService {


  public get stagLoginUrl(): string {
    return stagLoginUrl;
  }

  public get stagFullUrl(): string {
    return stagLoginUrl + this.stagSuccessRedirectToUrl;
  }

  public get stagSuccessRedirectToUrl(): string {
    return stagSuccessRedirectToUrl;
  }

  constructor() { }

  redirectToStagAuthorization(): void {
    window.location.href = this.stagFullUrl;
  }

  isAnonymous(loginParams: StagLoginQueryParamsModel): boolean {
    return loginParams.stagUserTicket === 'anonymous';
  }

  authorize(loginParams: StagLoginQueryParamsModel): void {
    // TODO SEND CALL TO BACKEND

    // TODO SAVE USER TO STORE

    //
  }
}
