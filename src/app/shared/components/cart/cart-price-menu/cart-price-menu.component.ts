import { Component, Input } from '@angular/core';
import { IGetCartResponse } from '../../../../types';
import { RouterLink } from '@angular/router';
import { calculateTotalPrice } from '../../../utils';

@Component({
    selector: 'app-cart-price-menu',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './cart-price-menu.component.html',
    styleUrl: './cart-price-menu.component.css',
})
export class CartPriceMenuComponent {
    @Input() cart: IGetCartResponse | null = null;

    calculateTotalPrice() {
        return calculateTotalPrice(this.cart);
    }
}
