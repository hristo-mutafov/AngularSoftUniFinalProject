import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductFavoritesComponent } from './product-favorites/product-favorites.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'add',
                component: ProductAddComponent,
            },
            {
                path: 'favorites',
                component: ProductFavoritesComponent,
            },
            {
                path: ':id',
                component: ProductDetailsComponent,
            },
        ],
    },
];
