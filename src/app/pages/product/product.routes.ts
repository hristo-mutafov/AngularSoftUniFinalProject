import { Routes } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
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
                path: 'edit/:id',
                canActivate: [isStaffGuard],
                component: ProductEditComponent,
            },
            {
                path: ':id',
                component: ProductDetailsComponent,
            },
        ],
    },
];
