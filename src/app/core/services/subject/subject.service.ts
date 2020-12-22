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

  create(subject: SubjectModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/subject/create', subject);
  }

  get(): Observable<SubjectModel[]> {
    return this.httpClient.get<SubjectModel[]>(apiUrl + '/teacher/subject');
  }

  getSingle(subjectId: number): Observable<SubjectModel> {
    return this.httpClient.get<SubjectModel>(apiUrl + '/teacher/subject/' + subjectId);
  }

}
