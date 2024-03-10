import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProfileComponent,
            },
        ],
    },
];
