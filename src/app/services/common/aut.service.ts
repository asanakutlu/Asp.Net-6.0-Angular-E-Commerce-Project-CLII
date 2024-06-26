import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AutService {

  constructor(private jwthelper:JwtHelperService) { }
  IdentityCheck(){

  const token:string=localStorage.getItem("accessToken");
  //const decodeToken=this.jwtHelper.decodeToken(token);
  //const expiratioonDate=this.jwtHelper.getTokenExpritaionDate(token);
  let expired:boolean;
  try{
    expired=this.jwthelper.isTokenExpired(token);
  }catch{
    expired=true;
  }
  _isAuthenticated=token!=null && !expired;
  }
  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}
export let _isAuthenticated: boolean;
