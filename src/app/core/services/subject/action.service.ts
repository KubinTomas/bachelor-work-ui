import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeActionAttendanceResult } from '../../models/others/change-action-attendance-result.model';
import { Mail } from '../../models/others/mail.model';
import { ActionPersonModel } from '../../models/persons/action-person.model';
import { StudentModel } from '../../models/persons/student.model';
import { BlockActionModel } from '../../models/subject/block-action.model';
import { BlockModel } from '../../models/subject/block.model';
import { apiUrl } from '../../models/url.model';
import { BlockWhitelistSaveModel } from '../../models/whitelist/block-whitelist-save.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private httpClient: HttpClient) { }

  create(action: BlockActionModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/action/create', action);
  }

  update(action: BlockActionModel): Observable<any> {
    return this.httpClient.put<any>(apiUrl + '/teacher/action/update', action);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/action/delete/' + id);
  }


  get(blockId: number): Observable<BlockActionModel[]> {
    return this.httpClient.get<BlockActionModel[]>(apiUrl + '/teacher/action/' + blockId);
  }

  getWhitelist(blockId: number): Observable<any> {
    return this.httpClient.get<any>(apiUrl + '/teacher/action/whitelist/' + blockId);
  }

  getSingle(blockId: number): Observable<BlockActionModel> {
    return this.httpClient.get<BlockActionModel>(apiUrl + '/teacher/action/detail/' + blockId);
  }

  saveWhitelist(saveModel: BlockWhitelistSaveModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/action/whitelist/save', saveModel);
  }

  queueKick(queueId: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/action/queue/kick/' + queueId);
  }

  attendanceKick(attendanceId: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/action/attendance/kick/' + attendanceId);
  }

  attendanceFulfilled(attendanceId: number, fulfilled: boolean): Observable<ActionPersonModel> {
    return this.httpClient.get<ActionPersonModel>(apiUrl + '/teacher/action/attendance/fulfilled/' + attendanceId + '/' + fulfilled);
  }

  addStudent(student: StudentModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/action/add/student', student);
  }

  sendMail(mail: Mail): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/action/mail/send', mail);
  }

  changeAttendanceClick(actionId: number, attendance: number): Observable<ChangeActionAttendanceResult> {
    return this.httpClient.get<ChangeActionAttendanceResult>(apiUrl + '/teacher/action/attendance/set-all/' + actionId + '/' + attendance);
  }

}
