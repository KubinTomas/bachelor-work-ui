import { Injectable } from '@angular/core';
import { StagAuthenticationService } from './stag-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public get stagAuthentication(): StagAuthenticationService {
    return this.stagAuthenticationService;
  }

  constructor(private readonly stagAuthenticationService: StagAuthenticationService) { }
}
