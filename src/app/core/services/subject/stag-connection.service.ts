import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StagPredmetModel } from '../../models/stag/stag-predmet.model';
import { TermStagConnectionModel } from '../../models/subject/term-stag-connection.model';
import { apiUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class StagConnectionService {

  constructor(private httpClient: HttpClient) { }

  create(stagConnection: TermStagConnectionModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/TermStagConnection/create', stagConnection);
  }

  update(stagConnection: TermStagConnectionModel): Observable<any> {
    return this.httpClient.put<any>(apiUrl + '/teacher/TermStagConnection/update', stagConnection);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/TermStagConnection/delete/' + id);
  }

  getSubjects(department: string, year: string, term: string): Observable<StagPredmetModel[]> {
    let params = new HttpParams();
    params = params.append('department', department);
    params = params.append('year', year);
    params = params.append('term', term);

    return this.httpClient.get<StagPredmetModel[]>(apiUrl + '/teacher/TermStagConnection/subjects', { params });
  }


  get(termId: number): Observable<TermStagConnectionModel[]> {
    return this.httpClient.get<TermStagConnectionModel[]>(apiUrl + '/teacher/TermStagConnection/' + termId);
  }

  getSingle(blockId: number): Observable<TermStagConnectionModel> {
    return this.httpClient.get<TermStagConnectionModel>(apiUrl + '/teacher/TermStagConnection/detail/' + blockId);
  }

}
