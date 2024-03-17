import { Injectable } from '@angular/core';

import { IAuthResponse, IRefreshTokenResponse } from '../../types';
import { AuthStateService } from '../state/auth-state.service';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private TOKEN_NAME = 'session';
    private _refreshState = false;

    get accessToken() {
        return sessionStorage.getItem(this.TOKEN_NAME);
    }

    get refreshToken() {
        return localStorage.getItem(this.TOKEN_NAME);
    }

    get refreshState() {
        return this._refreshState;
    }

    set setRefreshState(state: boolean) {
        this._refreshState = state;
    }

    constructor(private authState: AuthStateService) {}

    authHandler = ({
        access_token,
        refresh_token,
        is_staff,
    }: IAuthResponse) => {
        this.authState.setIsStaff(is_staff);
        this.uploadTokens(access_token, refresh_token);
    };

    refreshHandler = ({ access }: IRefreshTokenResponse) => {
        this.uploadAccessToken(access);
    };

    removeTokens() {
        sessionStorage.removeItem(this.TOKEN_NAME);
        localStorage.removeItem(this.TOKEN_NAME);
    }

    private uploadTokens(accessToken: string, refreshToken: string) {
        this.uploadAccessToken(accessToken);
        this.uploadLocalStorage(refreshToken);
    }

    private uploadLocalStorage(refreshToken: string) {
        localStorage.setItem(this.TOKEN_NAME, refreshToken);
    }

    private uploadAccessToken(accessToken: string) {
        sessionStorage.setItem(this.TOKEN_NAME, accessToken);
    }
}
