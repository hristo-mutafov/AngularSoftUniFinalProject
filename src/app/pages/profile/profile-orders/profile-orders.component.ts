import { Component } from '@angular/core';
import { ProfileSidenavComponent } from '../../../shared/components/profile/profile-sidenav/profile-sidenav.component';

@Component({
    selector: 'app-profile-orders',
    standalone: true,
    imports: [ProfileSidenavComponent],
    templateUrl: './profile-orders.component.html',
    styleUrl: '../all-profile.css',
})
export class ProfileOrdersComponent {
    // TODO: Mock Data:
    order = {
        order_number: '32h432bd23d',
        date: '10.03.24',
        price: 5.4,
    };
}
