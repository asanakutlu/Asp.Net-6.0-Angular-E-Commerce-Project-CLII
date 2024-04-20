import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService, private productservices:ProductService,private alertify:AlertifyService){
    super(spinner)
  }

ngOnInit(): void {
}
@Output() createdProduct:EventEmitter<Create_Product>=new EventEmitter();
@Output() fileUploadOptions:Partial<FileUploadOptions>={
  action:"upload",
  controller:"products",
  explanation:"drag and select images",
  isAdminPage:true,
  accept:".png, .jpg, .jpeg, .json"
};
create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
  this.showSpinner(SpinnerType.BollAtom);
  const create_product:Create_Product=new Create_Product();
  create_product.ProductName=name.value;
  create_product.ProductStock=parseInt(stock.value);
  create_product.ProductPrice=parseFloat(price.value);

  this.productservices.create(create_product,()=>{
    this.hiddenSpinner(SpinnerType.BollAtom);
    this.alertify.message("Product Sıccess",{
      dismissOthers:true,
      messageType:MessageType.Success,
      position:Position.BottomCenter
    });
    this.createdProduct.emit(create_product);
  },errorMessage=>{
    this.alertify.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Error,
      position:Position.BottomCenter
    })
  });
}
}
