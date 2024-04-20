import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { CompomentsModule } from './compoments/compoments.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    CompomentsModule,

  ],
  exports:[
    LayoutModule,

  ]
})
export class AdminModule { }
