import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { HttpService } from '../../core/services/http.service';
import { IProductList } from '../../types';
import { Subscription } from 'rxjs';
import { AuthStateService } from '../../core/state/auth-state.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ProductListComponent, LoaderComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
    products: IProductList | null = null;
    subscription: Subscription | null = null;
    isLoading = true;

    constructor(
        private http: HttpService,
        private router: Router,
        private route: ActivatedRoute,
        private authState: AuthStateService,
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.queryParams.subscribe((params) => {
            if (params['favorites'] && this.authState.isAuthenticated()) {
                this.http.getFavoriteProducts().subscribe({
                    next: (products) => {
                        products[0].products.forEach(
                            (product) => (product.in_favorites = true),
                        );
                        this.isLoading = false;
                        this.products = products[0].products;
                    },
                    error: () => this.router.navigate(['not-found']), //TODO: redirect to 500
                });
            } else {
                this.http.getProductList().subscribe({
                    next: (products) => {
                        this.isLoading = false;
                        this.products = products;
                    },
                    error: (err) => {
                        console.log(err);

                        this.router.navigate(['not-found']);
                    }, //TODO: redirect to 500
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
