import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import { AuthStateService } from '../../../core/state/auth-state.service';
import { SERVER_ERROR_500 } from '../../constants';

@Component({
    selector: 'app-edit-email-panel',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-email-panel.component.html',
    styleUrl: '../edit-panel.css',
})
export class EditEmailPanelComponent {
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
            this.formError = 'Both fields are required!';
            return;
        }
        const { email, password }: { email: string; password: string } =
            form.value;

        const profile = this.authState.getProfile()!;

        if (email === profile.email) {
            this.formError = 'Type different email than the current one!';
            return;
        }

        this.http.validatePassword(password).subscribe({
            next: () => {
                this.http.updateProfile({ email }).subscribe({
                    next: () => {
                        this.closePanel();
                        profile.email = email;
                        this.authState.setProfileFromState(profile);
                    },
                    error: () => {
                        this.formError = SERVER_ERROR_500;
                    },
                });
            },
            error: (err: HttpErrorResponse) => {
                if (
                    err.status === 400 &&
                    err.error.message === 'Wrong Password'
                ) {
                    this.formError = err.error.message;
                } else {
                    this.formError = SERVER_ERROR_500;
                }
            },
        });
    }
}
