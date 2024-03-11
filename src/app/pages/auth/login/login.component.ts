import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmailDirective } from '../../../shared/directives/email.directive';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, FormsModule, EmailDirective],
    templateUrl: './login.component.html',
    styleUrl: '../auth.css',
})
export class LoginComponent {
    login(form: NgForm) {}
}
