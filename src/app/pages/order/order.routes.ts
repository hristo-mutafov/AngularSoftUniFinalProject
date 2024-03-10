import { Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderFinishedComponent } from './order-finished/order-finished.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: OrderComponent,
            },
            {
                path: 'finished',
                component: OrderFinishedComponent,
            },
        ],
    },
];
