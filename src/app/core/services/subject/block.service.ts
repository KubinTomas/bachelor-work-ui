import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentBlockModel } from '../../models/student/student-block.model';
import { BlockModel } from '../../models/subject/block.model';
import { apiUrl } from '../../models/url.model';
import { BlockWhitelistSaveModel } from '../../models/whitelist/block-whitelist-save.model';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private httpClient: HttpClient) { }

  create(block: BlockModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/block/create', block);
  }

  update(block: BlockModel): Observable<any> {
    return this.httpClient.put<any>(apiUrl + '/teacher/block/update', block);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(apiUrl + '/teacher/block/delete/' + id);
  }

  getStudents(blockId: number): Observable<StudentBlockModel[]> {
    return this.httpClient.get<StudentBlockModel[]>(apiUrl + '/teacher/block/students/' + blockId);
  }

  get(termId: number): Observable<BlockModel[]> {
    return this.httpClient.get<BlockModel[]>(apiUrl + '/teacher/block/' + termId);
  }

  getWhitelist(blockId: number): Observable<any> {
    return this.httpClient.get<any>(apiUrl + '/teacher/block/whitelist/' + blockId);
  }

  getSingle(blockId: number): Observable<BlockModel> {
    return this.httpClient.get<BlockModel>(apiUrl + '/teacher/block/detail/' + blockId);
  }

  saveWhitelist(saveModel: BlockWhitelistSaveModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/block/whitelist/save', saveModel);
  }
}
