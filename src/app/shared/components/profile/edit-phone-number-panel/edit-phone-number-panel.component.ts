import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';
import { AuthStateService } from '../../../../core/state/auth-state.service';
import { FIELDS_ARE_REQUIRED, SERVER_ERROR_500 } from '../../../constants';

@Component({
    selector: 'app-edit-phone-number-panel',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-phone-number-panel.component.html',
    styleUrl: '../edit-panel.css',
})
export class EditPhoneNumberPanelComponent {
    @Output() hideChangeNamePanel = new EventEmitter();

    formError: string = '';

    constructor(
        private http: HttpService,
        private authState: AuthStateService,
    ) {}

    closePanel() {
        this.hideChangeNamePanel.emit();
    }

    editPhoneNumber(form: NgForm) {
        if (form.invalid) {
            this.formError = FIELDS_ARE_REQUIRED;
            return;
        }
        const { phoneNumber }: { phoneNumber: string } = form.value;

        const profile = this.authState.getProfile()!;

        this.http.updateProfile({ phone_number: phoneNumber }).subscribe({
            next: () => {
                this.closePanel();
                profile.phoneNumber = phoneNumber;
                this.authState.setProfileFromState(profile);
            },
            error: () => {
                this.formError = SERVER_ERROR_500;
            },
        });
    }
}
