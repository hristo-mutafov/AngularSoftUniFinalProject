import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartStateService {
    private _cartCount$$ = new BehaviorSubject(0);
    private _cartCount$ = this._cartCount$$.asObservable();

    get cartCount$() {
        return this._cartCount$;
    }
    constructor() {}
}
