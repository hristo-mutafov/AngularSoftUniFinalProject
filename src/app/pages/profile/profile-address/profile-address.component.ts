import { Component } from '@angular/core';
import { ProfileSidenavComponent } from '../../../shared/profile-sidenav/profile-sidenav.component';

@Component({
    selector: 'app-profile-address',
    standalone: true,
    imports: [ProfileSidenavComponent],
    templateUrl: './profile-address.component.html',
    styleUrl: '../all-profile.css',
})
export class ProfileAddressComponent {}
