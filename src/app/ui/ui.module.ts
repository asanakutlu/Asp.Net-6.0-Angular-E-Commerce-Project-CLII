import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompomentsModule } from './compoments/compoments.module';
import { LoginComponent } from './compomenrs/login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CompomentsModule
  ],
  exports:[
    CompomentsModule
  ]
})
export class UiModule { }
