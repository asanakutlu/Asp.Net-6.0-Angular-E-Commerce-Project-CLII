import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list-product-imge';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

declare var $:any
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{

  constructor(dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService){
    super(dialogRef)
  }
  images:List_Product_Image[];
  async ngOnInit() {
    this.spinner.show(SpinnerType.BollAtom);
   this.images=await this.productService.readImages(this.data as string,()=>this.spinner.hide(SpinnerType.BollAtom));
  }
  async deleteImage(imageId:string,event:any){
    this.spinner.show(SpinnerType.BollAtom)
    await this.productService.deleteImage(this.data as string,imageId,()=>{
      this.spinner.hide(SpinnerType.BollAtom);
      var card=$(event.srcElement).parent().parent();
      card.fadeOut(500);
    });
  }
  showCase(imageId:string){
   this.spinner.show(SpinnerType.BollAtom);
   this.productService.changeShowcaseImage(imageId,this.data as string,()=>{
    this.spinner.hide(SpinnerType.BollAtom);
   })
    }

  @Output() options:Partial<FileUploadOptions>={
    accept:".png, .jpg,, .jpeg, .gif",
    action:"upload",
    controller:"products",
    explanation:"Product imege select.....",
    isAdminPage:true,
    queryString:`id=${this.data}`

  };
}
export enum  SelectProductImageState {
 Close
}
