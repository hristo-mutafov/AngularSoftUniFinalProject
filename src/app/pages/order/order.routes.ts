import { Routes } from '@angular/router';
import { OrderComponent } from './order.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: OrderComponent,
            },
        ],
    },
];
