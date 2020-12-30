import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectModel } from '../../models/subject/subject.model';
import { apiUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) { }

  create(subject: SubjectModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/subject/create', subject);
  }

  update(subject: SubjectModel): Observable<any> {
    return this.httpClient.put<any>(apiUrl + '/teacher/subject/update', subject);
  }

  delete(subjectId: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/subject/delete/' + subjectId);
  }

  get(): Observable<SubjectModel[]> {
    return this.httpClient.get<SubjectModel[]>(apiUrl + '/teacher/subject');
  }

  getSingle(subjectId: number): Observable<SubjectModel> {
    return this.httpClient.get<SubjectModel>(apiUrl + '/teacher/subject/' + subjectId);
  }

}
