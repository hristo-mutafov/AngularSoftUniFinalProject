import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpService } from '../../../core/services/http.service';
import { AuthStateService } from '../../../core/state/auth-state.service';
import {
    AUTHENTICATION_400,
    SERVER_ERROR_500,
} from '../../../shared/constants';
import { EmailDirective } from '../../../shared/directives/email.directive';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, FormsModule, EmailDirective],
    templateUrl: './login.component.html',
    styleUrl: '../auth.css',
})
export class LoginComponent {
    error = signal('');

    constructor(
        private api: HttpService,
        private router: Router,
        private authState: AuthStateService,
    ) {}

    login(form: NgForm) {
        if (form.invalid) return;

        const { email, password } = form.value;
        this.api.login(email, password).subscribe({
            next: () => {
                this.api.getProfile().subscribe((profile) => {
                    this.authState.setProfileFromServer(profile);
                    this.router.navigate(['home']);
                });
            },
            error: (err) => {
                const status = err.status;
                if (status == 401 || status == 404) {
                    this.error.set(AUTHENTICATION_400);
                } else {
                    this.error.set(SERVER_ERROR_500);
                }
            },
        });
    }
}
