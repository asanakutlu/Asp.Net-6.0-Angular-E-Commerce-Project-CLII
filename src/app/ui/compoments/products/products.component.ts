import { HttpClientService } from './../../../services/common/http-client.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService,private HttpClientService:HttpClientService){
    super(spinner)
  }

  ngOnInit(): void {
   // this.showSpinner(SpinnerType.BollAtom);
    //this.HttpClientService.get({
    //  controller: "products"
   // }).subscribe(data=>console.log(data));
  }

}
