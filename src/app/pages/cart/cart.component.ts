import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { IGetCartResponse } from '../../types';
import { catchError, retry, throwError } from 'rxjs';
import { ERROR_RETRY_TIMES } from '../../shared/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetWholePricePipe } from '../../shared/pipes/get-whole-price.pipe';
import { GetDecimalPartPipe } from '../../shared/pipes/get-decimal-part.pipe';
import { getFutureDate } from '../../shared/utils';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { EmptyCartComponent } from '../../shared/components/cart/empty-cart/empty-cart.component';
import { CartTableComponent } from '../../shared/components/cart/cart-table/cart-table.component';
import { CartPriceMenuComponent } from '../../shared/components/cart/cart-price-menu/cart-price-menu.component';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        GetWholePricePipe,
        GetDecimalPartPipe,
        LoaderComponent,
        EmptyCartComponent,
        CartTableComponent,
        CartPriceMenuComponent,
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
    isLoading = true;
    cart: IGetCartResponse | null = null;
    dateAfterFourDays = getFutureDate(4);

    constructor(
        private http: HttpService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.http
            .getCart()
            .pipe(
                retry(ERROR_RETRY_TIMES),
                catchError((err: HttpErrorResponse) => {
                    return throwError(err);
                }),
            )
            .subscribe({
                next: (cart) => {
                    this.isLoading = false;
                    this.cart = cart;
                },
                error: () => this.router.navigate(['server-error']),
            });
    }
}
