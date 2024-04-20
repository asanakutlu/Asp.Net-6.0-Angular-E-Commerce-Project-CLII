import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderService } from 'src/app/services/common/models/order.service';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,
    private orderService:OrderService,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
    ){
    super(spinner);
  }
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice','createdDate','completed','viewDetail','delete'];
  dataSource:MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
async getOrders(){
  this.showSpinner(SpinnerType.BollAtom);
  const allOrders:{totalOrderCount:number;  orders:List_Order[]} =await this.orderService.getAllOrders
  (this.paginator ? this.paginator.pageIndex:0,this.paginator ?
    this.paginator.pageSize:5,
    ()=>this.hiddenSpinner(SpinnerType.BollAtom),errorMessage=>this.alertifyService.message(errorMessage,{
     dismissOthers:true,
     messageType:MessageType.Error,
     position:Position.TopCenter
   }))
   this.dataSource=new MatTableDataSource<List_Order>(allOrders.orders)
  this.paginator.length=allOrders.totalOrderCount;

}
// delete(id,event){
//   alert(id);
//   const img:HTMLImageElement=event.srcElement;
//   $(img.parentElement.parentElement).fadeOut(2000);
// }
async pageChanged(){
  await this.getOrders();
}
  async ngOnInit() {
   await this.getOrders()
  }
  showDeatail(id:string){
    this.dialogService.openDialog({
      componentType:OrderDetailDialogComponent,
      data:id,
      options:{
        width:"750px"
      }
    })
  }

}
