import { Component, Input } from '@angular/core';

import { IGetCartResponse } from '../../../../types';
import { LoaderComponent } from '../../loader/loader.component';
import { getFutureDate } from '../../../utils';
import { GetDecimalPartPipe } from '../../../pipes/get-decimal-part.pipe';
import { GetWholePricePipe } from '../../../pipes/get-whole-price.pipe';
import { HttpService } from '../../../../core/services/http.service';

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

    constructor(private http: HttpService) {}

    calculateTotalPricePerProduct(productPrice: string, productCount: number) {
        const sum = Number(productPrice) * productCount;
        return String(sum.toFixed(2));
    }

    decreaseProductCount(id: number) {
        const product = this.cart?.filter(
            (product) => product.product.id === id,
        );

        if (product) {
            if (product[0].count === 1) {
                const index = this.cart?.findIndex(
                    (product) => product.product.id === id,
                );
                this.cart?.splice(index!, 1);
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
        const product = this.cart?.filter(
            (product) => product.product.id === id,
        );

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
}
