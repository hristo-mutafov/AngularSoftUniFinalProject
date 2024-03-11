import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    private user = new BehaviorSubject('');

    constructor() {}
}
