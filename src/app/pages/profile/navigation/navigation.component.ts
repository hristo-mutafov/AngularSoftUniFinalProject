import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-navigation',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
})
export class ProfileNavigationComponent {}
