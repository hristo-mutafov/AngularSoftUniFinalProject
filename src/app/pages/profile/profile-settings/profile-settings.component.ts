import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ProfilePanelStateService } from '../../../core/services/profile-panel-state.service';
import { AuthStateService } from '../../../core/state/auth-state.service';
import { DeleteProfilePanelComponent } from '../../../shared/components/profile/delete-profile-panel/delete-profile-panel.component';
import { EditEmailPanelComponent } from '../../../shared/components/profile/edit-email-panel/edit-email-panel.component';
import { EditNamePanelComponent } from '../../../shared/components/profile/edit-name-panel/edit-name-panel.component';
import { EditPasswordPanelComponent } from '../../../shared/components/profile/edit-password-panel/edit-password-panel.component';
import { ProfileSidenavComponent } from '../../../shared/components/profile/profile-sidenav/profile-sidenav.component';
import { BLANK_FIELD_MESSAGE } from '../../../shared/constants';
import { IProfileState } from '../../../types';

@Component({
    selector: 'app-profile-settings',
    standalone: true,
    imports: [
        ProfileSidenavComponent,
        EditNamePanelComponent,
        EditEmailPanelComponent,
        EditPasswordPanelComponent,
        DeleteProfilePanelComponent,
    ],
    templateUrl: './profile-settings.component.html',
    styleUrl: '../all-profile.css',
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
    authStateSubscription: Subscription | null = null;
    profile: IProfileState | null = null;
    openedPanels = {
        editNamePanel: false,
        editEmailPanel: false,
        editPasswordPanel: false,
        deleteProfilePanel: false,
    };
    blankFieldMessage = BLANK_FIELD_MESSAGE;

    constructor(
        private authState: AuthStateService,
        private router: Router,
        private profilePanelState: ProfilePanelStateService,
    ) {}
    ngOnInit(): void {
        this.authStateSubscription = this.authState
            .getProfile$()
            .subscribe((profile) => {
                if (!profile) {
                    this.router.navigate(['home']);
                }
                this.profile = profile;
            });
    }

    showEditNamePanel() {
        this.profilePanelState.isActive = true;
        this.openedPanels.editNamePanel = true;
    }

    showEditEmailPanel() {
        this.profilePanelState.isActive = true;
        this.openedPanels.editEmailPanel = true;
    }

    showEditPasswordPanel() {
        this.profilePanelState.isActive = true;
        this.openedPanels.editPasswordPanel = true;
    }

    showDeleteProfilePanel() {
        this.profilePanelState.isActive = true;
        this.openedPanels.deleteProfilePanel = true;
    }

    hideOpenedPanels() {
        Object.keys(this.openedPanels).forEach((panel) => {
            this.openedPanels[panel as keyof typeof this.openedPanels] = false;
        });
        this.profilePanelState.isActive = false;
    }

    ngOnDestroy(): void {
        this.authStateSubscription?.unsubscribe();
    }
}
