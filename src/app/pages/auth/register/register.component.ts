import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../../core/services/http.service';
import { EmailDirective } from '../../../shared/directives/email.directive';
import { EqualPasswordDirective } from '../../../shared/directives/equal-password.directive';
import {
    AUTHENTICATION_400,
    AUTHENTICATION_500,
} from '../../../shared/constants';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, FormsModule, EmailDirective, EqualPasswordDirective],
    templateUrl: './register.component.html',
    styleUrl: '../auth.css',
})
export class RegisterComponent {
    error = signal('');

    constructor(
        private api: HttpService,
        private router: Router,
    ) {}

    register(form: NgForm) {
        if (form.invalid) return;

        const { email, password } = form.value;

        this.api.register(email, password).subscribe({
            next: () => this.router.navigate(['home']),
            error: (err) => {
                const status = err.status;
                if (status == 400) {
                    this.error.set(AUTHENTICATION_400);
                } else {
                    this.error.set(AUTHENTICATION_500);
                }
            },
        });
    }
}
