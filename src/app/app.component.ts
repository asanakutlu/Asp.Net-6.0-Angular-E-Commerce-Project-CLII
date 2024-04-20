import { Component, NgModule, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AutService } from './services/common/aut.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { NgxSpinnerModule } from 'ngx-spinner';

declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'projectName';
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;

  constructor(public authService:AutService,
    private toastrService:CustomToastrService,
    private router:Router,private httpClientService:HttpClientService,
    private dynamicLoadComponentService:DynamicLoadComponentService){

      httpClientService.post({
        controller:"baskets"
      },{productId:"jjkjkhkjhk",
        quantity:67
      }).subscribe(data=>{
        debugger;
      });
    authService.IdentityCheck();
  }

  singOut(){
    localStorage.removeItem("accessToken");
    this.authService.IdentityCheck();
    this.router.navigate([""]);
    this.toastrService.message("oturum kapaıldı","oturum kapatıldı",{
      messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRight
    })
  }
  loadComponent(){
      this.dynamicLoadComponentService.loadComponent
      (ComponentType.BasketComponent,this.dynamicLoadComponentDirective.viewContainerRef);
  }
}

  //$.get("https://localhost:7014/api/Products", data=>{
   // console.log(data)
  //})


