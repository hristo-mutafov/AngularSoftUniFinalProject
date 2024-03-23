import { Component, Input } from '@angular/core';

import { IGetCartResponse } from '../../../../types';
import { LoaderComponent } from '../../loader/loader.component';
import { getFutureDate } from '../../../utils';
import { GetDecimalPartPipe } from '../../../pipes/get-decimal-part.pipe';
import { GetWholePricePipe } from '../../../pipes/get-whole-price.pipe';
import { HttpService } from '../../../../core/services/http.service';
import { CartStateService } from '../../../../core/state/cart-state.service';

@Component({
    selector: 'app-cart-table',
    standalone: true,
    imports: [LoaderComponent, GetWholePricePipe, GetDecimalPartPipe],
    templateUrl: './cart-table.component.html',
    styleUrl: './cart-table.component.css',
})
export class CartTableComponent {
    @Input() isLoading: boolean | null = null;
    @Input() cart: IGetCartResponse | null = null;

    dateAfterFourDays = getFutureDate(4);

    constructor(
        private http: HttpService,
        private cartState: CartStateService,
    ) {}

    calculateTotalPricePerProduct(productPrice: string, productCount: number) {
        const sum = Number(productPrice) * productCount;
        return String(sum.toFixed(2));
    }

    decreaseProductCount(id: number) {
        const product = this.getProduct(id);

        if (product) {
            if (product[0].count === 1) {
                this.removeProductFromCart(id);
            } else {
                product[0].count--;
            }
        }

        this.http.decreaseProductCountFromCart(id).subscribe({
            error: () => {
                if (product) {
                    product[0].count++;
                }
            },
        });
    }

    increaseProductCount(id: number) {
        const product = this.getProduct(id);

        if (product) {
            product[0].count++;
        }

        this.http.addToCart(id).subscribe({
            error: () => {
                if (product) {
                    product[0].count--;
                }
            },
        });
    }

    removeProduct(id: number) {
        const product = this.getProduct(id);

        this.http.removeFromCart(id).subscribe({
            next: () => {
                this.cartState.decreaseCount(product![0].count);
                this.removeProductFromCart(id);
            },
            error: () => {
                this.cart?.push(product![0]);
            },
        });
    }

    private getProduct(id: number) {
        return this.cart?.filter((product) => product.product.id === id);
    }

    private removeProductFromCart(id: number) {
        const index = this.cart?.findIndex(
            (product) => product.product.id === id,
        );
        this.cart?.splice(index!, 1);
    }
}
