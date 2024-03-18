import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./pages/auth/auth.routes').then((r) => r.routes),
    },
    {
        path: 'product',
        loadChildren: () =>
            import('./pages/product/product.routes').then((r) => r.routes),
    },
    {
        path: 'profile',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () =>
            import('./pages/profile/profile.routes').then((r) => r.routes),
    },
    {
        path: 'cart',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () =>
            import('./pages/cart/cart.routes').then((r) => r.routes),
    },
    {
        path: 'order',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () =>
            import('./pages/order/order.routes').then((r) => r.routes),
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
