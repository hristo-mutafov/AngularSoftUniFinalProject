import { Component, Input } from '@angular/core';
import { IGetCartResponse } from '../../../../types';

@Component({
    selector: 'app-cart-price-menu',
    standalone: true,
    imports: [],
    templateUrl: './cart-price-menu.component.html',
    styleUrl: './cart-price-menu.component.css',
})
export class CartPriceMenuComponent {
    @Input() cart: IGetCartResponse | null = null;

    calculateTotalPrice() {
        let sum = 0;
        this.cart?.forEach((product) => {
            sum += Number(product.product.price) * product.count;
        });
        return sum;
    }
}
