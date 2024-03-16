import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, filter } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthStateService implements OnDestroy {
    private authSubject$$ = new BehaviorSubject<string | null>(null);
    private auth$ = this.authSubject$$
        .asObservable()
        .pipe(filter((auth) => auth !== null));

    private _accessToken: string | null = null;
    private subscription: Subscription;

    constructor() {
        this.subscription = this.auth$.subscribe((auth) => {
            this._accessToken = auth;
        });
    }

    get accessToken(): string | null {
        return this._accessToken;
    }

    isAuthenticated() {
        return !!this._accessToken;
    }

    authenticate(accessToken: string) {
        this.authSubject$$.next(accessToken);
    }

    unAuthenticate() {
        this.authSubject$$.next(null);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
