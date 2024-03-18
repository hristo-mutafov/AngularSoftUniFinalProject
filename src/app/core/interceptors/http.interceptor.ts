import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { isTokenExpired } from '../../shared/validators/jwt.validator';
import { HttpService } from '../services/http.service';
import { TokenService } from '../services/token.service';
import { AuthStateService } from '../state/auth-state.service';

const BASE_URL = environment.apiUrl;

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    const authState = inject(AuthStateService);
    const tokenService = inject(TokenService);
    const http = inject(HttpService);

    if (req.url.startsWith('/api')) {
        req = req.clone({
            url: req.url.replace('/api', BASE_URL) + '/',
        });

        if (authState.isAuthenticated()) {
            if (checkToken(tokenService) && !tokenService.refreshState) {
                tokenService.setRefreshState = true;
                return http.getAccessToken(tokenService.refreshToken!).pipe(
                    switchMap(() => {
                        req = setHeader(req, tokenService.accessToken);
                        tokenService.setRefreshState = false;
                        return next(req);
                    }),
                );
            } else {
                req = setHeader(req, tokenService.accessToken);
            }
        }
    }

    return next(req);
};

function checkToken(tokenService: TokenService) {
    const tokenExpired = isTokenExpired(tokenService.accessToken);
    const refreshExpired = isTokenExpired(tokenService.refreshToken);

    if (tokenExpired && !refreshExpired) {
        return true;
    }
    return false;
}

function setHeader(req: HttpRequest<unknown>, accessToken: string | null) {
    return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
}
