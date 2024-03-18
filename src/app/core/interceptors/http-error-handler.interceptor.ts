import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthStateService } from '../state/auth-state.service';
import { TokenService } from '../services/token.service';

export const httpErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    const authState = inject(AuthStateService);
    const tokenService = inject(TokenService);
    const router = inject(Router);

    return next(req).pipe(
        catchError(catchErrorHandler(authState, router, tokenService)),
    );
};

const catchErrorHandler =
    (authState: AuthStateService, router: Router, tokenService: TokenService) =>
    (error: HttpErrorResponse) => {
        if (error.status === 401) {
            tokenService.removeTokens();
            authState.unAuthenticate();
            router.navigate(['auth/login']);
        }
        return throwError(error);
    };
