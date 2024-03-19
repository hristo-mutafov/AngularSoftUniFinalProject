import { Component, Input } from '@angular/core';
import { IProductList } from '../../../types';
import { RouterLink } from '@angular/router';

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
}
