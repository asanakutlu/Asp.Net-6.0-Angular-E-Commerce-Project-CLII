import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message:string, messageType:MessageType, position :Position, delay:number=3,dismissOthers:boolean=false){
    message(message:string, options:Partial<AlertfiyOptions>){

  alertify.set('notifier','delay',options.delay)
    alertify.set('notifier','position',options.position);
    const msj=alertify[options.messageType](message);
    if(options.dismissOthers)
    {
      msj.dismissOthers();
    }
  }
  dismiss(){
    alertify.dismissAll();
  }
}
export class AlertfiyOptions{
messageType:MessageType=MessageType.Message;
position:Position=Position.BottomRight;
delay:number=3;
dismissOthers:boolean=false;

}
export enum MessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warnig"
}
export enum Position{
    TopCenter="top-center",
    TopRight="top-right",
    TopLeft="top-left",
    BottomRight="bottom-right",
    BottomLeft="bottom-left",
    BottomCenter="bottom-center"
}
