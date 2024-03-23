import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

import { HttpService } from '../../core/services/http.service';
import { IGetCartResponse } from '../../types';
import { ERROR_RETRY_TIMES } from '../../shared/constants';
import { getFutureDate } from '../../shared/utils';
import { EmptyCartComponent } from '../../shared/components/cart/empty-cart/empty-cart.component';
import { CartTableComponent } from '../../shared/components/cart/cart-table/cart-table.component';
import { CartPriceMenuComponent } from '../../shared/components/cart/cart-price-menu/cart-price-menu.component';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [EmptyCartComponent, CartTableComponent, CartPriceMenuComponent],
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
        this.http.getCart().subscribe({
            next: (cart) => {
                this.isLoading = false;
                this.cart = cart;
            },
            error: () => this.router.navigate(['server-error']),
        });
    }
}
