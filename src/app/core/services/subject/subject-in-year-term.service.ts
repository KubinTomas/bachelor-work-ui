import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectInYearTermModel } from '../../models/subject/subject-in-year-term.model';
import { SubjectInYearModel } from '../../models/subject/subject-in-year.model';
import { apiUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectInYearTermService {

  constructor(private httpClient: HttpClient) { }

  getYears(currentYear: number = new Date().getFullYear()): string[] {
    const years: string[] = [];

    for (let i = currentYear + 1; i >= 1980; i--) {
      const year = this.getFormattedYear(i);
      years.push(year);
    }

    return years;
  }

  getCurrentYear(currentYear: number = new Date().getFullYear()): string {
    return this.getFormattedYear(currentYear);
  }

  getFormattedYear(year: number): string {
    return year.toString() + ' - ' + year.toString() + '/' + (year + 1).toString();
  }

  create(term: SubjectInYearTermModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/SubjectInYearTerm/create', term);
  }

  update(term: SubjectInYearTermModel): Observable<any> {
    return this.httpClient.put<any>(apiUrl + '/teacher/SubjectInYearTerm/update', term);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/SubjectInYearTerm/delete/' + id);
  }

  get(subjectInYearId: number): Observable<SubjectInYearTermModel[]> {
    return this.httpClient.get<SubjectInYearTermModel[]>(apiUrl + '/teacher/SubjectInYearTerm/' + subjectInYearId);
  }

  getSingle(termId: number): Observable<SubjectInYearTermModel> {
    return this.httpClient.get<SubjectInYearTermModel>(apiUrl + '/teacher/SubjectInYearTerm/detail/' + termId);
  }
}
