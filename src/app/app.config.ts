import { ApplicationConfig } from '@angular/core';
import {
    PreloadAllModules,
    provideRouter,
    withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideHttpClient(withInterceptors([httpInterceptor])),
    ],
};
