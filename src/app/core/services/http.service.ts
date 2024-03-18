import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, tap, throwError } from 'rxjs';

import {
    IAuthResponse,
    IProductList,
    IProfile,
    IRefreshTokenResponse,
    IUpdateProfileData,
} from '../../types';
import { TokenService } from './token.service';
import { ERROR_RETRY_TIMES } from '../../shared/constants';

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

    updateProfile(data: IUpdateProfileData) {
        return this.http.patch<{ message: string }>('/api/user', data);
    }

    validatePassword(password: string) {
        return this.http.post<{ message: string }>(
            '/api/user/validate_password',
            { password },
        );
    }

    deleteProfile() {
        return this.http.delete('/api/user');
    }

    getProductList() {
        return this.http.get<IProductList>('/api/products').pipe(
            retry(ERROR_RETRY_TIMES),
            catchError((err: HttpErrorResponse) => {
                return throwError(err);
            }),
        );
    }
}
