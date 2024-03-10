import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
        path: 'profile',
        loadChildren: () =>
            import('./pages/profile/profile.routes').then((r) => r.routes),
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
