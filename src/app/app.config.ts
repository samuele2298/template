import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Lara from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpErrorHandler } from './http-error-handler.service';
import { unauthInterceptor } from './unauth.interceptor';
import { httpRequestInterceptor } from './http-request.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Lara, options: { darkModeSelector: '.app-dark' } } }),
        provideAnimations(),
        provideToastr(),
        importProvidersFrom(BrowserAnimationsModule),
        HttpErrorHandler,
        provideHttpClient(withFetch(), withInterceptors([httpRequestInterceptor, unauthInterceptor,])),
    ]
};
