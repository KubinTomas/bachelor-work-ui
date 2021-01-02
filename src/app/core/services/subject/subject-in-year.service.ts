import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectInYearModel } from '../../models/subject/subject-in-year.model';
import { apiUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectInYearService {

  constructor(private httpClient: HttpClient) { }

  create(subjectInYear: SubjectInYearModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/SubjectInYear/create', subjectInYear);
  }

  get(subjectId: number): Observable<SubjectInYearModel[]> {
    return this.httpClient.get<SubjectInYearModel[]>(apiUrl + '/teacher/SubjectInYear/' + subjectId);
  }

  update(subjectInYear: SubjectInYearModel): Observable<any> {
    return this.httpClient.put<any>(apiUrl + '/teacher/SubjectInYear/update', subjectInYear);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/SubjectInYear/delete/' + id);
  }

  getSingle(subjectInYearId: number): Observable<SubjectInYearModel> {
    return this.httpClient.get<SubjectInYearModel>(apiUrl + '/teacher/SubjectInYear/detail/' + subjectInYearId);
  }
}
