import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductFavoritesComponent } from './product-favorites/product-favorites.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'add',
                component: ProductAddComponent,
            },
            {
                path: 'edit',
                component: ProductEditComponent,
            },
            {
                path: 'favorites',
                canActivate: [isAuthenticatedGuard],
                component: ProductFavoritesComponent,
            },
            {
                path: ':id',
                component: ProductDetailsComponent,
            },
        ],
    },
];
