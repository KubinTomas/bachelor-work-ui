import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentActionPostModel } from '../../models/student/student-action-post.model';
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

  get(filter: StudentActionPostModel): Observable<StudentBlockActionModel[]> {
    return this.httpClient.post<StudentBlockActionModel[]>(apiUrl + '/studentAction', filter);
  }

  join(actionId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/studentAction/join/' + actionId);
  }

  joinQueue(actionId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/studentAction/queue/join/' + actionId);
  }

  leave(actionId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/studentAction/leave/' + actionId);
  }

  leaveQueue(actionId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(apiUrl + '/studentAction/queue/leave/' + actionId);
  }
}
