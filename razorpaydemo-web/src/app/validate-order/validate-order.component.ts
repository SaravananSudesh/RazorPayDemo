import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validate-order',
  standalone: true,
  imports: [],
  templateUrl: './validate-order.component.html',
  styleUrl: './validate-order.component.css'
})
export class ValidateOrderComponent {
  order_id:string = ''

  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.order_id = this.route.snapshot.paramMap.get('order_id') || ''
  }
}
