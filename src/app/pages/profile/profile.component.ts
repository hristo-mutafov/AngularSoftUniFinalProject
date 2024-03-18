import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProfileSidenavComponent } from '../../shared/components/profile-sidenav/profile-sidenav.component';
import { profileRoutes } from './profile.routes';
import { ProfilePanelStateService } from '../../core/services/profile-panel-state.service';

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
