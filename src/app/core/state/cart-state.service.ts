import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartStateService implements OnDestroy {
    private _cartCount$$ = new BehaviorSubject(0);
    private _cartCount$ = this._cartCount$$.asObservable();
    private _currentCount = 0;
    private subscription: Subscription | null = null;

    get cartCount$() {
        return this._cartCount$;
    }
    constructor() {
        this.subscription = this.cartCount$.subscribe((count) => {
            this._currentCount = count;
        });
    }

    increment() {
        this._cartCount$$.next(++this._currentCount);
    }

    decrement() {
        this._cartCount$$.next(--this._currentCount);
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
