import { Component } from '@angular/core';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
    // TODO: Mock Data:
    product = {
        image: 'https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg',
        brand: 'Nike',
        category: {
            name: 'Demo',
        },
        made_in: 'China',
        description: 'No desc.',
    };
    date_after_two_days = '12.03.24';
    date_after_four_days = '14.03.24';
}
