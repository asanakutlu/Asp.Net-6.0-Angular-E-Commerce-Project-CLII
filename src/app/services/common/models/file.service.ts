import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
//import { BaseUrl } from '../../../contracts/base_url';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private httpClientService: HttpClientService) { }

  async getBaseStorageUrl(): Promise<string> {
    const getObservable: Observable<string> = this.httpClientService.get<string>({
      controller: "files",
      action: "GetBaseStorageUrl"
    });
    return await firstValueFrom(getObservable);
  }
}
