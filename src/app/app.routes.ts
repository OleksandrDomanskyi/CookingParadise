import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login-page/login-page.component')
      .then(m => m.LoginPage)
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipes-page/recipes-page.component')
      .then(m => m.RecipesPage),
    canActivate: [authGuard], 
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error-page/error-page.component')
      .then(m => m.ErrorPage)
  }
];
