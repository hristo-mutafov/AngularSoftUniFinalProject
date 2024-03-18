import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../../../core/services/token.service';
import { AuthStateService } from '../../../core/state/auth-state.service';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private authState: AuthStateService,
    ) {}

    ngOnInit(): void {
        this.authState.unAuthenticate();
        this.tokenService.removeTokens();
        this.router.navigate(['home']);
    }
}
