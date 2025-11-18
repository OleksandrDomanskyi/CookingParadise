import { inject, untracked } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = untracked(() => authService.isAuthenticated());

  return isAuth
    ? true
    : router.createUrlTree([''], { queryParams: { returnUrl: '/recipes' } });
};