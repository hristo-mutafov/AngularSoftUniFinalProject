import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStateService } from '../../../core/state/auth-state.service';
import { ProfileSidenavComponent } from '../../../shared/components/profile-sidenav/profile-sidenav.component';
import { IProfileState } from '../../../types';
import { EditNamePanelComponent } from '../../../shared/components/edit-name-panel/edit-name-panel.component';
import { Subscription } from 'rxjs';
import { EditEmailPanelComponent } from '../../../shared/components/edit-email-panel/edit-email-panel.component';
import { EditPasswordPanelComponent } from '../../../shared/components/edit-password-panel/edit-password-panel.component';

@Component({
    selector: 'app-profile-settings',
    standalone: true,
    imports: [
        ProfileSidenavComponent,
        EditNamePanelComponent,
        EditEmailPanelComponent,
        EditPasswordPanelComponent,
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
    };

    get eitherPanelOpened(): boolean {
        let contain = false;

        Object.keys(this.openedPanels).forEach((panel) => {
            if (this.openedPanels[panel as keyof typeof this.openedPanels]) {
                contain = true;
            }
        });

        return contain;
    }

    constructor(
        private authState: AuthStateService,
        private router: Router,
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
        this.openedPanels.editNamePanel = true;
    }

    showEditEmailPanel() {
        this.openedPanels.editEmailPanel = true;
    }

    showEditPasswordPanel() {
        this.openedPanels.editPasswordPanel = true;
    }

    hideOpenedPanels() {
        Object.keys(this.openedPanels).forEach((panel) => {
            this.openedPanels[panel as keyof typeof this.openedPanels] = false;
        });
    }

    ngOnDestroy(): void {
        this.authStateSubscription?.unsubscribe();
    }
}
