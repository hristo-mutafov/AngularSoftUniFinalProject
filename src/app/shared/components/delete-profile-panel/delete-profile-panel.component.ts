import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../../core/services/http.service';
import { AuthStateService } from '../../../core/state/auth-state.service';
import { SERVER_ERROR_500 } from '../../constants';
import { TokenService } from '../../../core/services/token.service';

@Component({
    selector: 'app-delete-profile-panel',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './delete-profile-panel.component.html',
    styleUrl: '../edit-panel.css',
})
export class DeleteProfilePanelComponent {
    @Output() hideChangeNamePanel = new EventEmitter();

    formError: string = '';

    constructor(
        private http: HttpService,
        private authState: AuthStateService,
        private router: Router,
        private tokenService: TokenService,
    ) {}

    closePanel() {
        this.hideChangeNamePanel.emit();
    }

    deleteProfile() {
        this.http.deleteProfile().subscribe({
            next: () => {
                this.authState.unAuthenticate();
                this.tokenService.removeTokens();
                this.closePanel();
                this.router.navigate(['home']);
            },
            error: () => {
                this.formError = SERVER_ERROR_500;
            },
        });
    }
}
