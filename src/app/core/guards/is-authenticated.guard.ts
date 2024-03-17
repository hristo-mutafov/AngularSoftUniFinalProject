import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStateService } from '../state/auth-state.service';

export const isAuthenticatedGuard: CanActivateFn = () => {
    const authState = inject(AuthStateService);
    const router = inject(Router);

    if (authState._authenticated) {
        return true;
    }
    router.navigate(['auth/login']);
    return false;
};
