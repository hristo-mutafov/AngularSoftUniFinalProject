import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-profile-sidenav',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './profile-sidenav.component.html',
    styleUrl: './profile-sidenav.component.css',
})
export class ProfileSidenavComponent {
    constructor(private router: Router) {}

    isActive(route: string): boolean {
        return this.router.isActive(route, true);
    }
}
