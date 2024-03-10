import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: '../auth.css',
})
export class RegisterComponent {
    register(form: NgForm) {
        console.log(form.valid);
        console.log(form.value);
    }
}
