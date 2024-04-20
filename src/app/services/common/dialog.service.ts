import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  constructor(private dialog:MatDialog) { }
  openDialog(dialogParametrs:Partial<DialogParametrs>): void {
    const dialogRef = this.dialog.open(dialogParametrs.componentType,{
      width :dialogParametrs.options?.width,
      height :dialogParametrs.options?.height,
      position :dialogParametrs.options?.position,
      data:dialogParametrs.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==dialogParametrs.data.Yes)
      dialogParametrs.afterClosed();
    });
  }
}
export class DialogParametrs{
  componentType:ComponentType<any>;
  data:any;
  afterClosed: ()=>void;
  options?:Partial<DialogOptions> = new DialogOptions();
}
export class DialogOptions{
  width? :string ="250px";
  height? :string;
  position? :DialogPosition;
}
