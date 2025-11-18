import { Component, effect, untracked, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RecipesSearchComponent } from './recipes-search/recipes-search.component';
import { RecipesTableComponent } from './recipes-table/recipes-table.component';
import { RecipesPaginationComponent } from './recipes-pagination/recipes-pagination.component';
import { RecipeService } from '../../services/recipe-service.service';
import { RecipesParams } from '../../models/search-params.model';

@Component({
  selector: 'app-recipes-main',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RecipesSearchComponent,
    RecipesTableComponent,
    RecipesPaginationComponent,
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);

  readonly limit = 10;

  readonly search = signal<string>('');
  readonly tag = signal<string>('');
  readonly page = signal<number>(1);

  readonly recipes = this.recipeService.recipes;
  readonly total = this.recipeService.total;
  readonly loading = this.recipeService.loading;
  readonly error = this.recipeService.error;

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    this.search.set(params.get('search') ?? '');
    this.tag.set(params.get('tag') ?? '');
    const pageParam = params.get('page');
    this.page.set(pageParam ? Math.max(1, Number(pageParam)) : 1);

    this.loadRecipes();
  }

  constructor() {
    effect(() => {
      untracked(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: this.search() || null,
            tag: this.tag() || null,
            page: this.page() > 1 ? this.page() : null,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      });
    });

    effect(() => {
      const params: RecipesParams = {
        search: this.search() || undefined,
        tag: this.tag() || undefined,
        limit: this.limit,
        skip: (this.page() - 1) * this.limit,
      };

      untracked(() => this.recipeService.loadRecipes(params));
    });
  }

  private loadRecipes(): void {
    const params: RecipesParams = {
      search: this.search() || undefined,
      tag: this.tag() || undefined,
      limit: this.limit,
      skip: (this.page() - 1) * this.limit,
    };
    this.recipeService.loadRecipes(params);
  }

  onSearch(value: string): void {
    this.search.set(value.trim());
    this.page.set(1);
  }

  onTagChange(tag: string): void {
    this.tag.set(tag);
    this.page.set(1);
  }

  onPageChange(page: number): void {
    this.page.set(page);
  }

  retry(): void {
    this.loadRecipes();
  }
}
