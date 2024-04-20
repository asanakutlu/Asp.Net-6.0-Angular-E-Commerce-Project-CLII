import {  NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
    constructor(private spinner:NgxSpinnerService){}
      showSpinner(spinnerNameTye:SpinnerType){
        this.spinner.show(spinnerNameTye);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide(spinnerNameTye);
        }, 3000);
      }
      hiddenSpinner(spinnerNameTye:SpinnerType){
        this.spinner.hide(spinnerNameTye)
      }

}
export enum SpinnerType{
  BollAtom="s1",
  ballspinclockwisefaderotating="s2",
  ballscalemultiple="s3"

}
