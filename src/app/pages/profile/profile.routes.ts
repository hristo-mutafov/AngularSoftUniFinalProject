import { Routes } from '@angular/router';
import { ProfileNavigationComponent } from './navigation/navigation.component';
import { ProfileAddressComponent } from './profile-address/profile-address.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            {
                path: 'settings',
                component: ProfileSettingsComponent,
            },
            {
                path: 'address',
                component: ProfileAddressComponent,
            },
            {
                path: 'orders',
                component: ProfileOrdersComponent,
            },
        ],
    },
    {
        path: 'navigation',
        component: ProfileNavigationComponent,
    },
];
