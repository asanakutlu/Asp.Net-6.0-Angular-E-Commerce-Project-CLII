import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(private spinner:NgxSpinnerService){}
    ngOnInit(): void{
    this.spinner.show("s1");
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide("s1");
    }, 5000);
    }



}
