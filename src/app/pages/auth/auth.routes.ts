import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { alreadyAuthenticatedGuard } from '../../core/guards/already-authenticated.guard';

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
        ],
    },
];
