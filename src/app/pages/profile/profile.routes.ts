import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProfileComponent,
            },
            {
                path: 'settings',
                component: ProfileSettingsComponent,
            },
        ],
    },
];
