import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from '@clr/angular';
import { httpRequestInterceptor } from './http-request.interceptor';
import { unauthInterceptor } from './unauth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, ClarityModule),
    HttpErrorHandler,
    provideHttpClient(withFetch(), withInterceptors([httpRequestInterceptor, unauthInterceptor,])),
    provideAnimations(),
    provideToastr()
  ]
};
