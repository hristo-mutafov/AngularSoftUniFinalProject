import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ProfileSidenavComponent } from '../../../shared/components/profile-sidenav/profile-sidenav.component';
import { IProfileState } from '../../../types';
import { AuthStateService } from '../../../core/state/auth-state.service';
import { ProfilePanelStateService } from '../../../core/services/profile-panel-state.service';
import { BLANK_FIELD_MESSAGE } from '../../../shared/constants';
import { EditCityPanelComponent } from '../../../shared/components/edit-city-panel/edit-city-panel.component';

@Component({
    selector: 'app-profile-address',
    standalone: true,
    imports: [ProfileSidenavComponent, EditCityPanelComponent],
    templateUrl: './profile-address.component.html',
    styleUrl: '../all-profile.css',
})
export class ProfileAddressComponent implements OnInit, OnDestroy {
    authStateSubscription: Subscription | null = null;
    profile: IProfileState | null = null;
    openedPanels = {
        editCityPanel: false,
        editAddressPanel: false,
        editPhoneNumberPanel: false,
    };
    blankFieldMessage = BLANK_FIELD_MESSAGE; //TODO: Implement on the other place

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

    showEditCityPanel() {
        this.profilePanelState.isActive = true;
        this.openedPanels.editCityPanel = true;
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
