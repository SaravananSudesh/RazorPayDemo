import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {

  amount!:number

  constructor(private http: HttpClient){ }

  async createOrder(){

    await this.http.post(`http://localhost:3000/api/createOrder/${this.amount}`, {}, {responseType: 'text'}).subscribe(
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
