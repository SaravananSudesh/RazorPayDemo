import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pay-order.component.html',
  styleUrl: './pay-order.component.css'
})
export class PayOrderComponent {
  key_id:string = 'rzp_test_YdkwPDgTAi1NbL'
  name:string = 'Test Corp'
  order_id:string = ''
  amount:string = ''
  currency:string = 'INR'
  callback_url:string = 'http:www.google.com'
  cancel_url:string = 'http:www.microsoft.com'

  frameHTML = ''

  constructor(private http: HttpClient){}

  async payOrder(){
    let body = {
      'order_id' : this.order_id,
      'amount' : this.amount
    }

    await this.http.post('http://localhost:3000/api/payOrder', body, {responseType: 'text'}).subscribe(
      res => {
        let winUrl = URL.createObjectURL(new Blob([res], { type: 'text/html' }))
        window.open(winUrl)
      },
      error => {
        console.log(error)
      }
    )
    
  }
}
