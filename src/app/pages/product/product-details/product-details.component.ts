import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { HttpService } from '../../../core/services/http.service';
import { AuthStateService } from '../../../core/state/auth-state.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { GetDecimalPartPipe } from '../../../shared/pipes/get-decimal-part.pipe';
import { GetWholePricePipe } from '../../../shared/pipes/get-whole-price.pipe';
import { AddToFavoritesService } from '../../../shared/services/add-to-favorites.service';
import { getFutureDate } from '../../../shared/utils';
import { IProductDetail } from '../../../types';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        LoaderComponent,
        GetDecimalPartPipe,
        GetWholePricePipe,
        RouterLink,
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
    private product_id: number | null = null;

    isLoading = true;
    product: IProductDetail | null = null;
    date_after_two_days = getFutureDate(2);
    date_after_four_days = getFutureDate(4);
    isStaff: boolean | undefined = undefined;

    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private router: Router,
        private favoritesService: AddToFavoritesService,
        private authState: AuthStateService,
    ) {
        this.product_id = Number(this.route.snapshot.params['id']);
        this.isStaff = authState.isStaff();

        this.http.getProduct(this.product_id).subscribe({
            next: (product) => {
                this.product = product;
                this.isLoading = false;
            },
            error: () => {
                this.router.navigate(['not-found']);
            },
        });
    }

    handleAddToFavoritesButton() {
        this.favoritesService.handleAddToFavoritesButton(
            this.product!,
            this.product_id!,
        );
    }

    buy() {
        if (!this.authState.isAuthenticated()) {
            this.router.navigate(['auth/login']);
            return;
        }

        this.http.addToCart(this.product_id!).subscribe({
            error: () => {
                this.router.navigate(['server-error']);
            },
        });
    }

    deleteHandler(id: number | undefined) {
        if (id) {
            this.http.deleteProduct(id).subscribe({
                next: () => {
                    this.router.navigate(['home']);
                },
                error: () => {
                    this.router.navigate(['server-error']);
                },
            });
        }
    }
}
