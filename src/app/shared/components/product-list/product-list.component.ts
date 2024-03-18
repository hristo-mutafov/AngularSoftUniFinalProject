import { Component } from '@angular/core';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css',
})
export class ProductListComponent {
    product = {
        image: 'https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg',
        name: 'Demo Demo',
        price: 33.33,
    };
}
