import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-sidenav',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './profile-sidenav.component.html',
    styleUrl: './profile-sidenav.component.css',
})
export class ProfileSidenavComponent {}
