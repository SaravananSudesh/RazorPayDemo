import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateOrderComponent } from "./create-order/create-order.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CreateOrderComponent]
})
export class AppComponent {
  title = 'razorpaydemo-web';
}
