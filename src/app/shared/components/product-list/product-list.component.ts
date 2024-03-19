import { Component, Input } from '@angular/core';
import { IProduct, IProductList } from '../../../types';
import { RouterLink } from '@angular/router';
import { AddToFavoritesService } from '../../services/add-to-favorites.service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
})
export class ProductListComponent {
    // TODO: Animated No-products
    @Input() products: IProductList | null = null;

    constructor(private favoritesService: AddToFavoritesService) {}

    handleAddToFavoritesButton(event: MouseEvent, product: IProduct) {
        event.stopPropagation();
        const productId = product.id;
        this.favoritesService.handleAddToFavoritesButton(product, productId);
    }
}
