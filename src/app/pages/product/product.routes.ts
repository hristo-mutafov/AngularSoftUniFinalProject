import { Routes } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductFavoritesComponent } from './product-favorites/product-favorites.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';
import { isStaffGuard } from '../../core/guards/is-staff.guard';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'add',
                canActivate: [isStaffGuard],
                component: ProductAddComponent,
            },
            {
                path: 'edit',
                canActivate: [isStaffGuard],
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
