import { Observable, firstValueFrom, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Menu } from 'src/app/contracts/application-configuration/menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService:HttpClientService) { }
  async getAuthorizeDefinitionEndpoints(){
    const observable:Observable<Menu[]>=this.httpClientService.get<Menu[]>({
      controller:"ApplicationService"
    });
    return await firstValueFrom(observable);
  }
}
