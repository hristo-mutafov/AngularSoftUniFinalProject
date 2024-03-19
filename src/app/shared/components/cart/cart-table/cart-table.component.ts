import { Component, Input } from '@angular/core';
import { IGetCartResponse } from '../../../../types';
import { LoaderComponent } from '../../loader/loader.component';
import { getFutureDate } from '../../../utils';
import { GetDecimalPartPipe } from '../../../pipes/get-decimal-part.pipe';
import { GetWholePricePipe } from '../../../pipes/get-whole-price.pipe';

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

    calculateTotalPricePerProduct(productPrice: string, productCount: number) {
        const sum = Number(productPrice) * productCount;
        return String(sum);
    }
}
