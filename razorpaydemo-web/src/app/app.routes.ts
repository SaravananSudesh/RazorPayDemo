import { Routes } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ValidateOrderComponent } from './validate-order/validate-order.component';
import { PayOrderComponent } from './pay-order/pay-order.component';

export const routes: Routes = [
    { path: '', component: CreateOrderComponent },
    { path: 'pay', component: PayOrderComponent },
    { path: 'validate/:order_id', component: ValidateOrderComponent }
];
