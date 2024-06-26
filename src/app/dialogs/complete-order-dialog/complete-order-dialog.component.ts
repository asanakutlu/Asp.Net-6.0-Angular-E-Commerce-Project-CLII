import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShoppingCompleteDialogComponent } from '../shopping-complete-dialog/shopping-complete-dialog.component';


@Component({
  selector: 'app-complete-order-dialog',
  templateUrl: './complete-order-dialog.component.html',
  styleUrls: ['./complete-order-dialog.component.scss']
})
export class CompleteOrderDialogComponent extends BaseDialog<CompleteOrderDialogComponent>{
  constructor(dialogRef:MatDialogRef<CompleteOrderDialogComponent>,@Inject(MAT_DIALOG_DATA)
  public data:CompleteOrderDialogState){
    super(dialogRef);
  }

  complete(){

  }
}
export enum CompleteOrderDialogState{
  Yes,No
}
