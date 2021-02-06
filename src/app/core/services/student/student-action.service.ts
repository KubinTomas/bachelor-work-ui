import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentBlockActionModel } from '../../models/student/student-block-action.model';
import { BlockActionModel } from '../../models/subject/block-action.model';
import { BlockModel } from '../../models/subject/block.model';
import { apiUrl } from '../../models/url.model';
import { BlockWhitelistSaveModel } from '../../models/whitelist/block-whitelist-save.model';

@Injectable({
  providedIn: 'root'
})
export class StudentActionService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<StudentBlockActionModel[]> {
    return this.httpClient.get<StudentBlockActionModel[]>(apiUrl + '/studentAction');
  }

  join(actionId: number): Observable<StudentBlockActionModel[]> {
    return this.httpClient.get<StudentBlockActionModel[]>(apiUrl + '/studentAction/join/' + actionId);
  }

  joinQueue(actionId: number): Observable<StudentBlockActionModel[]> {
    return this.httpClient.get<StudentBlockActionModel[]>(apiUrl + '/studentAction/queue/join/' + actionId);
  }

  leave(actionId: number): Observable<StudentBlockActionModel[]> {
    return this.httpClient.get<StudentBlockActionModel[]>(apiUrl + '/studentAction/leave/' + actionId);
  }

  leaveQueue(actionId: number): Observable<StudentBlockActionModel[]> {
    return this.httpClient.get<StudentBlockActionModel[]>(apiUrl + '/studentAction/queue/leave/' + actionId);
  }
}
