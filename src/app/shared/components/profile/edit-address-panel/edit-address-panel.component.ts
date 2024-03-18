import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';
import { AuthStateService } from '../../../../core/state/auth-state.service';
import { FIELDS_ARE_REQUIRED, SERVER_ERROR_500 } from '../../../constants';

@Component({
    selector: 'app-edit-address-panel',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-address-panel.component.html',
    styleUrl: '../edit-panel.css',
})
export class EditAddressPanelComponent {
    @Output() hideChangeNamePanel = new EventEmitter();

    formError: string = '';

    constructor(
        private http: HttpService,
        private authState: AuthStateService,
    ) {}

    closePanel() {
        this.hideChangeNamePanel.emit();
    }

    editAddress(form: NgForm) {
        if (form.invalid) {
            this.formError = FIELDS_ARE_REQUIRED;
            return;
        }
        const { address }: { address: string } = form.value;

        const profile = this.authState.getProfile()!;

        this.http.updateProfile({ address }).subscribe({
            next: () => {
                this.closePanel();
                profile.address = address;
                this.authState.setProfileFromState(profile);
            },
            error: () => {
                this.formError = SERVER_ERROR_500;
            },
        });
    }
}
