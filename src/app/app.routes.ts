import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login-page/login-page.component')
      .then(m => m.LoginPage),
    title: 'Login'
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipes-page/recipes-page.component')
      .then(m => m.RecipesPage),
    canActivate: [authGuard], 
    title: 'Recipes'
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./pages/recipe-details-page/recipe-details-page.component')
        .then(m => m.RecipeDetailsPage),
    canActivate: [authGuard],
    title: 'Recipe'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error-page/error-page.component')
      .then(m => m.ErrorPage),
    title: 'The page is not found'
  }
];
