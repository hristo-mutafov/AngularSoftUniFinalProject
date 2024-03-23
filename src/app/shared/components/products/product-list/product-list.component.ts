import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct, IProductList } from '../../../../types';
import { AddToFavoritesService } from '../../../services/add-to-favorites.service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnChanges {
    @Input() products2: IProductList | null = null;
    @Input() searched: IProductList | null = null;

    products: IProductList | null = null;

    constructor(private favoritesService: AddToFavoritesService) {}
    ngOnChanges(): void {
        if (this.searched) {
            this.products = this.searched;
        } else {
            this.products = this.products2;
        }
    }

    handleAddToFavoritesButton(event: MouseEvent, product: IProduct) {
        event.stopPropagation();
        const productId = product.id;
        this.favoritesService.handleAddToFavoritesButton(product, productId);
    }
}
