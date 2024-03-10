import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'add',
                component: ProductAddComponent,
            },
            {
                path: ':id',
                component: ProductDetailsComponent,
            },
        ],
    },
];
