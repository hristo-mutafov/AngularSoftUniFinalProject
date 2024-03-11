import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../core/services/http.service';
import { EmailDirective } from '../../../shared/directives/email.directive';
import { EqualPasswordDirective } from '../../../shared/directives/equal-password.directive';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, FormsModule, EmailDirective, EqualPasswordDirective],
    templateUrl: './register.component.html',
    styleUrl: '../auth.css',
})
export class RegisterComponent {
    register(form: NgForm) {}
}
