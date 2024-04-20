
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree,  } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AutService, _isAuthenticated } from 'src/app/services/common/aut.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
@Injectable({
  providedIn:"root"
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper:JwtHelperService,private route:Route,private router:Router,
    private tostr:CustomToastrService,private spinner:NgxSpinnerService,private authservice:AutService){

  }

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  this.spinner.show(SpinnerType.BollAtom);
  //const token:string=localStorage.getItem("accessToken");
  //const decodeToken=this.jwtHelper.decodeToken(token);
  //const expiratioonDate=this.jwtHelper.getTokenExpritaionDate(token);
  //let expired:boolean;
 // try{
   // expired=this.jwtHelper.isTokenExpired(token);
 // }catch{
  //  expired=true;
 // }
if(!_isAuthenticated){
  this.router.navigate(["login"],{queryParams:{returnUrl:state.url}});
  this.tostr.message("oturum açman gerkiyor","yetkisiz girişim",{
    messageType:ToastrMessageType.Warning,
    position:ToastrPosition.TopRight
  })
}
  this.spinner.hide(SpinnerType.BollAtom);
   return true;
 }
}
