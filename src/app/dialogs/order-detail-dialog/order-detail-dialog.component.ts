import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SidebarComponent } from 'src/app/admin/layout/components/sidebar/sidebar.component';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderDialogState } from '../complete-order-dialog/complete-order-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,private orderService:OrderService,
    private dialogService:DialogService,private spinner:NgxSpinnerService,private toastrService:CustomToastrService){
    super(dialogRef);
  }
  singleOrder:SingleOrder;
  displayedColumns: string[] = ['name','price','quantity','totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;

 async ngOnInit(): Promise<void> {
   this.singleOrder= await this.orderService.getOrderById(this.data as string);
   this.dataSource=this.singleOrder.BasketItems;
   this.totalPrice=this.singleOrder.BasketItems.map((BasketItems,index)=>BasketItems.price * BasketItems.quantity)
   .reduce((price,current)=> price+ current);
  }
  CompleteOrder(){
    this.dialogService.openDialog({
      componentType:CompleteOrderDialogComponent,
      data:CompleteOrderDialogState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.BollAtom);
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BollAtom);
        this.toastrService.message("order succed","order",{
          messageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        });
      }
    });
  }

}
export enum OrderDetailDialogState{
  Cansel,
  OrderCompleted
}
