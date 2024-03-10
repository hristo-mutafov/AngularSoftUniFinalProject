import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

const BASE_URL = environment.apiUrl;

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith('/api')) {
        req = req.clone({
            url: req.url.replace('/api', BASE_URL) + '/',
        });
    }
    return next(req);
};
