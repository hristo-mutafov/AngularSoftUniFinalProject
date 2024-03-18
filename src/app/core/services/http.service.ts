import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { IAuthResponse, IProfile, IRefreshTokenResponse } from '../../types';
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
            .pipe(tap(this.tokenService.authHandler));
    }

    login(email: string, password: string) {
        return this.http
            .post<IAuthResponse>('/api/login', { email, password })
            .pipe(tap(this.tokenService.authHandler));
    }

    getAccessToken(refreshToken: string) {
        return this.http
            .post<IRefreshTokenResponse>('/api/token/refresh', {
                refresh: refreshToken,
            })
            .pipe(tap(this.tokenService.refreshHandler));
    }

    getProfile() {
        return this.http.get<IProfile>('/api/user');
    }
}
