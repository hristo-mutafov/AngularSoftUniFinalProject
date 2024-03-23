import { Injectable } from '@angular/core';
import { AuthStateService } from '../../core/state/auth-state.service';
import { Router } from '@angular/router';
import { IProduct, IProductDetail } from '../../types';
import { HttpService } from '../../core/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class AddToFavoritesService {
    constructor(
        private authState: AuthStateService,
        private router: Router,
        private http: HttpService,
    ) {}

    handleAddToFavoritesButton(
        product: IProductDetail | IProduct,
        product_id: number,
    ) {
        if (!this.authState.isAuthenticated()) {
            this.router.navigate(['auth/login']);
            return;
        }
        try {
            product!.in_favorites = !product!.in_favorites;
        } catch {
            this.router.navigate(['server-error']);
            return;
        }

        if (product!.in_favorites) {
            this.addToFavorites(product, product_id);
        } else {
            this.removeFromFavorites(product, product_id);
        }
    }

    private addToFavorites(
        product: IProductDetail | IProduct,
        product_id: number,
    ) {
        this.http.addToFavorite(product_id!).subscribe({
            error: () => {
                product!.in_favorites = !product!.in_favorites;
            },
        });
    }

    private removeFromFavorites(
        product: IProductDetail | IProduct,
        product_id: number,
    ) {
        this.http.removeFromFavorites(product_id!).subscribe({
            error: () => {
                product!.in_favorites = !product!.in_favorites;
            },
        });
    }
}
