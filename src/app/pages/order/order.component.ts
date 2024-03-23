import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { OrderDeliveryMethodComponent } from '../../shared/components/order/order-delivery-method/order-delivery-method.component';
import { OrderPaymentMethodComponent } from '../../shared/components/order/order-payment-method/order-payment-method.component';
import { OrderCommentComponent } from '../../shared/components/order/order-comment/order-comment.component';
import { OrderPriceComponent } from '../../shared/components/order/order-price/order-price.component';
import { DeliveryMethod, IUserInformation } from '../../types/order';
import { HttpService } from '../../core/services/http.service';
import { ORDER_400_ERROR } from '../../shared/constants';
import { calculateTotalPrice } from '../../shared/utils';

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
export class OrderComponent implements OnInit {
    paymentMethod = 'cash_on_delivery';
    deliveryMethod: DeliveryMethod | null = null;
    comment: string | null = null;
    userInformation: IUserInformation | null = null;
    price = '';
    errorMessage: string | null = null;

    disabledBuyButton = true;

    constructor(
        private http: HttpService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.http.getCart().subscribe({
            next: (cart) => {
                this.price = calculateTotalPrice(cart);
            },
            error: () => this.router.navigate(['server-error']),
        });
    }

    finishOrder() {
        if (!this.deliveryMethod || !this.userInformation) {
            this.errorMessage = ORDER_400_ERROR;
            return;
        }

        this.http
            .createOrder(this.paymentMethod, this.userInformation.address)
            .subscribe({
                next: () => {
                    this.router.navigate(['/order/finished']);
                },
                error: (err: HttpErrorResponse) => {
                    if (err.status < 500) {
                        this.errorMessage = err.error.message
                            ? err.error.message
                            : ORDER_400_ERROR;
                    } else {
                        this.router.navigate(['server-error']);
                    }
                },
            });
    }

    handleDeliveryMethodChange(method: DeliveryMethod) {
        this.deliveryMethod = method;
        this.checkDisabledButton();
    }

    handleUserInformationChange(userInformation: IUserInformation) {
        this.userInformation = userInformation;
        this.checkDisabledButton();
    }

    handleCommentChange(comment: string) {
        this.comment = comment;
    }

    private checkDisabledButton() {
        this.disabledBuyButton = !this.deliveryMethod || !this.userInformation;
    }
}
