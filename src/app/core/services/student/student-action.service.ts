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
export class StudentActionService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<BlockActionModel[]> {
    return this.httpClient.get<BlockActionModel[]>(apiUrl + '/studentAction');
  }

}
