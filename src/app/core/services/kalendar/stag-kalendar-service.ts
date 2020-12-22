import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StagAktualniObdobiInfoModel } from '../../models/stag-api-kalendar/stag-aktualni-obdobi-info.model';
import { apiUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class StagKalendarService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<StagAktualniObdobiInfoModel> {
    return this.httpClient.get<StagAktualniObdobiInfoModel>(apiUrl + '/stagKalendar/getAktualniObdobiInfo');
  }
}
