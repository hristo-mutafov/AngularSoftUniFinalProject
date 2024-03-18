import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { HttpService } from '../../../core/services/http.service';
import { AuthStateService } from '../../../core/state/auth-state.service';
import { FIELDS_ARE_REQUIRED, SERVER_ERROR_500 } from '../../constants';

@Component({
    selector: 'app-edit-name-panel',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-name-panel.component.html',
    styleUrl: '../edit-panel.css',
})
export class EditNamePanelComponent {
    @Output() hideChangeNamePanel = new EventEmitter();

    formError: string = '';

    constructor(
        private http: HttpService,
        private authState: AuthStateService,
    ) {}

    closePanel() {
        this.hideChangeNamePanel.emit();
    }

    editNames(form: NgForm) {
        if (form.invalid) {
            this.formError = FIELDS_ARE_REQUIRED;
            return;
        }
        const {
            first_name,
            last_name,
        }: { first_name: string; last_name: string } = form.value;

        this.http.updateProfile({ first_name, last_name }).subscribe({
            next: () => {
                this.closePanel();
                const profile = this.authState.getProfile()!;

                profile.firstName = first_name;
                profile.lastName = last_name;
                this.authState.setProfileFromState(profile);
            },
            error: () => {
                this.formError = SERVER_ERROR_500;
            },
        });
    }
}
