import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlockModel } from '../../models/subject/block.model';
import { apiUrl } from '../../models/url.model';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private httpClient: HttpClient) { }

  create(block: BlockModel): Observable<any> {
    return this.httpClient.post<any>(apiUrl + '/teacher/block/create', block);
  }

  get(subjectInYearId: number): Observable<BlockModel[]> {
    return this.httpClient.get<BlockModel[]>(apiUrl + '/teacher/block/' + subjectInYearId);
  }

  getSingle(blockId: number): Observable<BlockModel> {
    return this.httpClient.get<BlockModel>(apiUrl + '/teacher/block/' + blockId);
  }

}
