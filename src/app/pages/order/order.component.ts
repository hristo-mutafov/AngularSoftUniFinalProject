import { Component } from '@angular/core';
import { OrderDeliveryMethodComponent } from '../../shared/components/order/order-delivery-method/order-delivery-method.component';
import { OrderPaymentMethodComponent } from '../../shared/components/order/order-payment-method/order-payment-method.component';
import { OrderCommentComponent } from '../../shared/components/order/order-comment/order-comment.component';
import { OrderPriceComponent } from '../../shared/components/order/order-price/order-price.component';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [
        OrderDeliveryMethodComponent,
        OrderPaymentMethodComponent,
        OrderCommentComponent,
        OrderPriceComponent,
    ],
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
})
export class OrderComponent {
    finishOrder() {
        console.log('button pressed');
    }
}
