import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
    FIELDS_ARE_REQUIRED,
    PASSWORD_NOT_MATCH,
    SERVER_ERROR_500,
} from '../../constants';
import { HttpService } from '../../../core/services/http.service';
import { AuthStateService } from '../../../core/state/auth-state.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-edit-password-panel',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit-password-panel.component.html',
    styleUrl: '../edit-panel.css',
})
export class EditPasswordPanelComponent {
    @Output() hideChangeNamePanel = new EventEmitter();

    formError: string = '';

    constructor(
        private http: HttpService,
        private authState: AuthStateService,
    ) {}

    closePanel() {
        this.hideChangeNamePanel.emit();
    }

    editPassword(form: NgForm) {
        if (form.invalid) {
            this.formError = FIELDS_ARE_REQUIRED;
            return;
        }
        const {
            oldPassword,
            newPassword,
            repeatNewPassword,
        }: {
            oldPassword: string;
            newPassword: string;
            repeatNewPassword: string;
        } = form.value;

        if (newPassword !== repeatNewPassword) {
            this.formError = PASSWORD_NOT_MATCH;
            return;
        }

        this.http.validatePassword(oldPassword).subscribe({
            next: () => {
                this.http.updateProfile({ password: newPassword }).subscribe({
                    next: () => {
                        this.closePanel();
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
