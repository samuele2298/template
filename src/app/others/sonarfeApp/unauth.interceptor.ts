import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const unauthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(catchError(err => {
    if ([401, 403].includes(err.status)) {
      //authService.clearAuth();
    }
    const error = err.statusText;
    console.error(error);
    return throwError(() => error);
  }));
};
