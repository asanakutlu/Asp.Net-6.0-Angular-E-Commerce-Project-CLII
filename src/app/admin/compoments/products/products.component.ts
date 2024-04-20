import { Create_Product } from './../../../contracts/create_product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientService } from './../../../services/common/http-client.service';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListComponent } from './list/list.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{
showProductQrCodeReading() {
throw new Error('Method not implemented.');
}
  constructor(spinner:NgxSpinnerService,private HttpClientService:HttpClientService
    
  ){
    super(spinner)
  }

  ngOnInit(): void {

  }
  @ViewChild(ListComponent) listComponents:ListComponent;
  createdProduct(createdProduct:Create_Product){
    this.listComponents.getProducts();
  }

}
