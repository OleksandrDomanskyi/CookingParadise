import { Injectable, inject, signal, DestroyRef, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap, finalize } from 'rxjs';

import { environment } from '../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { Recipe } from '../models/recipe.model';
import { RecipesParams, RecipesResponse } from '../models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private readonly baseUrl = `${environment.apiBaseUrl}${ENDPOINTS.recipes}` as const;

  readonly recipes: WritableSignal<Recipe[]> = signal<Recipe[]>([]);
  readonly total: WritableSignal<number> = signal<number>(0);
  readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  readonly error: WritableSignal<string | null> = signal<string | null>(null);

  readonly tags: WritableSignal<string[]> = signal<string[]>([]);
  readonly tagsLoading: WritableSignal<boolean> = signal<boolean>(false);

  loadRecipes(params: RecipesParams): void {
    this.loading.set(true);
    this.error.set(null);

    const url = this.buildUrl(params);

    this.http
      .get<RecipesResponse>(url)
      .pipe(
        tap((response) => {
          if (!response) return;

          if ('recipes' in response) {
            this.recipes.set(response.recipes);
            this.total.set(response.total ?? response.recipes.length);
          } else {
            this.recipes.set([]);
            this.total.set(0);
          }
        }),
        catchError((err) => {
          const message =
            err?.error?.message ?? err?.message ?? 'Не удалось загрузить рецепты';
          this.error.set(message);
          this.recipes.set([]);
          this.total.set(0);
          return of(null);
        }),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  loadTags(): void {
    if (this.tags().length > 0 || this.tagsLoading()) {
      return;
    }

    this.tagsLoading.set(true);

    this.http
      .get<string[]>(`${this.baseUrl}/tags`)
      .pipe(
        tap((data) => this.tags.set([...data].sort())),
        catchError(() => {
          this.tags.set([]);
          return of([]);
        }),
        finalize(() => this.tagsLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private buildUrl(params: RecipesParams): string {
    if (params.search) {
      return `${this.baseUrl}/search?q=${encodeURIComponent(params.search)}`;
    }

    if (params.tag) {
      return `${this.baseUrl}/tag/${encodeURIComponent(params.tag)}`;
    }

    return `${this.baseUrl}?limit=${params.limit}&skip=${params.skip}`;
  }

  reset(): void {
    this.recipes.set([]);
    this.total.set(0);
    this.loading.set(false);
    this.error.set(null);
  }

  getRecipeById(id: number) {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`).pipe(
      catchError(() => of(null)),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  updateLocalRecipe(updated: Recipe): void {
    this.recipes.update(recipes =>
      recipes.map(r => (r.id === updated.id ? updated : r))
    );
  }

  deleteLocalRecipe(id: number): void {
    this.recipes.update(recipes => recipes.filter(r => r.id !== id));
    this.total.update(t => Math.max(0, t - 1));
  }
}
