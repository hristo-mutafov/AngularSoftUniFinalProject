import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { TokenService } from './core/services/token.service';
import { AuthStateService } from './core/state/auth-state.service';
import { HttpService } from './core/services/http.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'AngularSoftUniFinalProject';
    loading = true;

    constructor(
        private tokenService: TokenService,
        private authState: AuthStateService,
        private http: HttpService,
    ) {}

    ngOnInit(): void {
        const accessToken = this.tokenService.accessToken;
        if (accessToken) {
            this.authState.authenticate(accessToken);
            this.loading = false;
        } else {
            const refreshToken = this.tokenService.refreshToken;

            if (refreshToken) {
                this.http
                    .getAccessToken(refreshToken)
                    .subscribe(() => (this.loading = false));
            } else {
                this.authState.unAuthenticate();
                this.loading = false;
            }
        }
    }
}
