import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { alreadyAuthenticatedGuard } from '../../core/guards/already-authenticated.guard';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                canActivate: [alreadyAuthenticatedGuard],
                component: LoginComponent,
            },
            {
                path: 'register',
                canActivate: [alreadyAuthenticatedGuard],
                component: RegisterComponent,
            },
            {
                path: 'logout',
                canActivate: [isAuthenticatedGuard],
                component: LogoutComponent,
            },
        ],
    },
];
