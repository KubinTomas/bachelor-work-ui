import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  get(termId: number): Observable<BlockActionModel[]> {
    return this.httpClient.get<BlockActionModel[]>(apiUrl + '/teacher/action/' + termId);
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
}
