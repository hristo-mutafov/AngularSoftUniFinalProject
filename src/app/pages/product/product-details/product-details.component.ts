import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProductDetail } from '../../../types';
import { HttpService } from '../../../core/services/http.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { getFutureDate } from '../../../shared/utils';
import { GetDecimalPartPipe } from '../../../shared/pipes/get-decimal-part.pipe';
import { GetWholePricePipe } from '../../../shared/pipes/get-whole-price.pipe';
import { AuthStateService } from '../../../core/state/auth-state.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [LoaderComponent, GetDecimalPartPipe, GetWholePricePipe],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
    private product_id: number | null = null;

    isLoading = true;
    product: IProductDetail | null = null;
    date_after_two_days = getFutureDate(2);
    date_after_four_days = getFutureDate(4);

    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private router: Router,
        private authState: AuthStateService,
    ) {
        this.product_id = Number(this.route.snapshot.params['id']);

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
        if (!this.authState.isAuthenticated()) {
            this.router.navigate(['auth/login']);
            return;
        }
        try {
            this.product!.in_favorites = !this.product!.in_favorites;
        } catch {
            this.router.navigate(['server-error']);
            return;
        }

        if (this.product!.in_favorites) {
            this.addToFavorites();
        } else {
            this.removeFromFavorites();
        }
    }

    private addToFavorites() {
        this.http.addToFavorite(this.product_id!).subscribe({
            error: () => {
                this.product!.in_favorites = !this.product!.in_favorites;
            },
        });
    }

    private removeFromFavorites() {
        this.http.removeFromFavorites(this.product_id!).subscribe({
            error: () => {
                this.product!.in_favorites = !this.product!.in_favorites;
            },
        });
    }
}
