import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { HttpService } from '../services/http.service';
import { map } from 'rxjs';

export const isStaffGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const http = inject(HttpService);

    return http.getProfile().pipe(
        map((data) => {
            if (data.is_staff) {
                return true;
            }

            router.navigate(['home']);
            return false;
        }),
    );
};
