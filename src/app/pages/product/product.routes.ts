import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: ':id',
                component: ProductDetailsComponent,
            },
        ],
    },
];
