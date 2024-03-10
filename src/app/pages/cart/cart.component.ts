import { Component } from '@angular/core';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent {
    // TODO: Mock Data:
    product = {
        image: 'https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg',
        name: 'T-Shirt',
        brand: 'Nike',
        price: 22.2,
        count: 1,
    };

    total_price = 22.2;
    overall_products_price = 22.2;
}
