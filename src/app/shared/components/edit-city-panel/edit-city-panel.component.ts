import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FIELDS_ARE_REQUIRED, SERVER_ERROR_500 } from '../../constants';
import { HttpService } from '../../../core/services/http.service';
import { AuthStateService } from '../../../core/state/auth-state.service';

@Component({
    selector: 'app-edit-city-panel',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-city-panel.component.html',
    styleUrl: '../edit-panel.css',
})
export class EditCityPanelComponent {
    @Output() hideChangeNamePanel = new EventEmitter();

    formError: string = '';

    constructor(
        private http: HttpService,
        private authState: AuthStateService,
    ) {}

    closePanel() {
        this.hideChangeNamePanel.emit();
    }

    editEmail(form: NgForm) {
        if (form.invalid) {
            this.formError = FIELDS_ARE_REQUIRED;
            return;
        }
        const { city }: { city: string } = form.value;

        const profile = this.authState.getProfile()!;

        this.http.updateProfile({ city }).subscribe({
            next: () => {
                this.closePanel();
                profile.city = city;
                this.authState.setProfileFromState(profile);
            },
            error: () => {
                this.formError = SERVER_ERROR_500;
            },
        });
    }
}
