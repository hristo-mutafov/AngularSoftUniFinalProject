import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../state/auth-state.service';

export const alreadyAuthenticatedGuard: CanActivateFn = () => {
    const authState = inject(AuthStateService);
    const router = inject(Router);

    if (authState.isAuthenticated()) {
        router.navigate(['profile']);
        return false;
    }
    return true;
};
