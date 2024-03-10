import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileAddressComponent } from './profile-address/profile-address.component';

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
            {
                path: 'address',
                component: ProfileAddressComponent,
            },
        ],
    },
];
