import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { HttpService } from './core/services/http.service';
import { TokenService } from './core/services/token.service';
import { AuthStateService } from './core/state/auth-state.service';
import { isTokenExpired } from './shared/validators/jwt.validator';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent],
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
        const refreshToken = this.tokenService.refreshToken;

        if (!accessToken && !refreshToken) {
            this.loading = false;
            return;
        }

        const tokenExpired = isTokenExpired(accessToken);
        const refreshExpired = isTokenExpired(refreshToken);

        if (tokenExpired && !refreshExpired) {
            this.refreshAccessToken(refreshToken!);
        } else if (!tokenExpired) {
            this.authState.authenticate();
            this.getProfile();
        } else {
            this.tokenService.removeTokens();
            this.loading = false;
        }
    }

    private refreshAccessToken(refreshToken: string): void {
        this.http.getAccessToken(refreshToken).subscribe({
            next: () => {
                this.authState.authenticate();
                this.getProfile();
            },
            error: () => (this.loading = false),
        });
    }

    private getProfile(): void {
        this.http.getProfile().subscribe({
            next: (profile) => {
                this.authState.setProfileFromServer(profile);
                this.loading = false;
            },
            error: () => (this.loading = false),
        });
    }
}
