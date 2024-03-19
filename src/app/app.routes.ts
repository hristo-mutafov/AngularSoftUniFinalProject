import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { ServerErrorPageComponent } from './pages/server-error/server-error-page.component';

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
            import('./pages/profile/profile.routes').then(
                (r) => r.profileRoutes,
            ),
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
        component: NotFoundPageComponent,
    },
    {
        path: 'server-error',
        component: ServerErrorPageComponent,
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
