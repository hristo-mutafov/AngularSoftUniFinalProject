import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';

import { IProfile, IProfileState } from '../../types';

@Injectable({
    providedIn: 'root',
})
export class AuthStateService implements OnDestroy {
    private authSubject$$ = new BehaviorSubject<IProfileState | null>(null);
    auth$ = this.authSubject$$.asObservable();

    private _authenticated = false;
    private _profile: IProfileState | null = null;
    private subscription: Subscription;

    constructor() {
        this.subscription = this.auth$.subscribe((auth) => {
            this._profile = auth;
            this._authenticated = !!auth;
        });
    }

    isAuthenticated$() {
        return this.auth$.pipe(
            map((state) => {
                return !!state;
            }),
        );
    }

    isAuthenticated() {
        return this._authenticated;
    }

    setProfileFromServer(profile: IProfile) {
        this.authSubject$$.next({
            email: profile.email,
            isStaff: profile.is_staff,
            firstName: profile.first_name,
            lastName: profile.last_name,
            address: profile.address,
            city: profile.city,
            phoneNumber: profile.phone_number,
        });
    }

    setProfileFromState(profile: IProfileState) {
        this.authSubject$$.next(profile);
    }

    getProfile$() {
        return this.auth$.pipe(
            map((state) => {
                return state;
            }),
        );
    }

    getProfile() {
        return this._profile;
    }

    setIsStaff(isStaff: boolean) {
        this.authSubject$$.next({ isStaff });
    }

    isStaff$() {
        return this.auth$.pipe(
            map((state) => {
                return !!state?.isStaff;
            }),
        );
    }

    isStaff() {
        return this._profile?.isStaff;
    }

    authenticate() {
        this.authSubject$$.next({ isStaff: false });
    }

    unAuthenticate() {
        this.authSubject$$.next(null);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
