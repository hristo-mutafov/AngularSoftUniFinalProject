import { Injectable } from '@angular/core';
import { AuthStateService } from '../state/auth-state.service';
import { IAuthResponse } from '../../types';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private TOKEN_NAME = 'session';

    constructor(private authState: AuthStateService) {}

    get accessToken() {
        return sessionStorage.getItem(this.TOKEN_NAME);
    }

    get refreshToken() {
        return localStorage.getItem(this.TOKEN_NAME);
    }

    manageTokens({ access_token, refresh_token }: IAuthResponse) {
        this.authState.authenticate(access_token);
        this.uploadTokens(access_token, refresh_token);
    }

    private uploadTokens(accessToken: string, refreshToken?: string) {
        this.uploadAccessToken(accessToken);
        if (refreshToken) {
            this.uploadLocalStorage(refreshToken);
        }
    }

    private uploadLocalStorage(refreshToken: string) {
        localStorage.setItem(this.TOKEN_NAME, refreshToken);
    }

    private uploadAccessToken(accessToken: string) {
        sessionStorage.setItem(this.TOKEN_NAME, accessToken);
    }
}
