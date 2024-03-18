import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProfilePanelStateService } from '../../core/services/profile-panel-state.service';
import { ProfileSidenavComponent } from '../../shared/components/profile/profile-sidenav/profile-sidenav.component';
import { profileRoutes } from './profile.routes';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterOutlet, ProfileSidenavComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent {
    constructor(private profilePanelState: ProfilePanelStateService) {}

    isPanelOpened() {
        return this.profilePanelState.isActive;
    }
}
