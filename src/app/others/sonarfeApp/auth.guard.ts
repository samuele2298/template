import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.userValue) {
    return true;
  }
  //authService.clearAuth(); 
  return false;
};
