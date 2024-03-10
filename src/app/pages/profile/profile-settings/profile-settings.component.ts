import { Component } from '@angular/core';
import { ProfileSidenavComponent } from '../../../shared/profile-sidenav/profile-sidenav.component';

@Component({
    selector: 'app-profile-settings',
    standalone: true,
    imports: [ProfileSidenavComponent],
    templateUrl: './profile-settings.component.html',
    styleUrl: './profile-settings.component.css',
})
export class ProfileSettingsComponent {}
