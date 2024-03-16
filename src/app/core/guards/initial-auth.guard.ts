import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';

import { TokenService } from '../services/token.service';
import { AuthStateService } from '../state/auth-state.service';
import { HttpService } from '../services/http.service';

export const initialAuthGuard: CanActivateFn = () => {
    const tokenService = inject(TokenService);
    const authStateService = inject(AuthStateService);
    const httpService = inject(HttpService);

    const accessToken = tokenService.accessToken;
    if (accessToken) {
        authStateService.authenticate(accessToken);
        return true;
    } else {
        const refreshToken = tokenService.refreshToken;

        if (refreshToken) {
            return httpService
                .getAccessToken(refreshToken)
                .pipe(map(() => true));
        } else {
            authStateService.unAuthenticate();
        }
    }
    return true;
};
