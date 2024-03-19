import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './server-error-page.component.html',
    styleUrl: './server-error-page.component.css',
})
export class ServerErrorPageComponent {}
