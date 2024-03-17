import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';

import { IProfile, IProfileState } from '../../types';

@Injectable({
    providedIn: 'root',
})
export class AuthStateService implements OnDestroy {
    private authSubject$$ = new BehaviorSubject<IProfileState | null>(null);
    auth$ = this.authSubject$$.asObservable();

    _authenticated = false;
    private subscription: Subscription;

    constructor() {
        this.subscription = this.auth$.subscribe((auth) => {
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

    setProfile(profile: IProfile) {
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

    setIsStaff(isStaff: boolean) {
        this.authSubject$$.next({ isStaff });
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
