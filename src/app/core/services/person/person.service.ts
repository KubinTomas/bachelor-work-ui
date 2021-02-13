import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionPersonModel } from '../../models/persons/action-person.model';
import { StudentModel } from '../../models/persons/student.model';
import { apiUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  findStudent(studentOsCislo: string): Observable<StudentModel> {
    return this.httpClient.get<StudentModel>(apiUrl + '/person/student/' + studentOsCislo);
  }
}
