import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { IAuthResponse, IRefreshTokenResponse } from '../../types';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
    ) {}

    register(email: string, password: string) {
        return this.http
            .post<IAuthResponse>('/api/register', {
                email,
                password,
            })
            .pipe(tap(this.tokenService.manageTokens));
    }

    login(email: string, password: string) {
        return this.http
            .post<IAuthResponse>('/api/login', { email, password })
            .pipe(tap(this.tokenService.manageTokens));
    }

    getAccessToken(refreshToken: string) {
        return this.http
            .post<IRefreshTokenResponse>('/api/token/refresh', {
                refresh: refreshToken,
            })
            .pipe(
                tap(({ access }) =>
                    this.tokenService.manageTokens({
                        access_token: access,
                        refresh_token: '',
                    }),
                ),
            );
    }
}
