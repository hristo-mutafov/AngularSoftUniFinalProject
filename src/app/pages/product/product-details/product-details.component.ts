import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProductDetail } from '../../../types';
import { HttpService } from '../../../core/services/http.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { getFutureDate } from '../../../shared/utils';
import { GetDecimalPartPipe } from '../../../shared/pipes/get-decimal-part.pipe';
import { GetWholePricePipe } from '../../../shared/pipes/get-whole-price.pipe';
import { AddToFavoritesService } from '../../../shared/services/add-to-favorites.service';

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
        private favoritesService: AddToFavoritesService,
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
        this.favoritesService.handleAddToFavoritesButton(
            this.product!,
            this.product_id!,
        );
    }
}
