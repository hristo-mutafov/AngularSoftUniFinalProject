import { Component } from '@angular/core';
import { ProfileSidenavComponent } from '../../../shared/profile-sidenav/profile-sidenav.component';

@Component({
    selector: 'app-profile-settings',
    standalone: true,
    imports: [ProfileSidenavComponent],
    templateUrl: './profile-settings.component.html',
    styleUrl: '../all-profile.css',
})
export class ProfileSettingsComponent {}
