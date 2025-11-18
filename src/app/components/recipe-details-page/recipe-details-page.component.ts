import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BackButtonComponent } from './back-button/back-button.component';
import { RecipeMainDetailsComponent } from './recipe-main-details/recipe-main-details.component';
import { RecipeIngredientsComponent } from './recipe-ingredients/recipe-ingredients.component';
import { RecipeInstructionsComponent } from './recipe-instructions/recipe-instructions.component';
import { RecipeService } from '../../services/recipe-service.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-details-main',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    BackButtonComponent,
    RecipeMainDetailsComponent,
    RecipeIngredientsComponent,
    RecipeInstructionsComponent
  ],
  templateUrl: './recipe-details-page.component.html',
  styleUrl: './recipe-details-page.component.scss'
})
export class RecipeDetailsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  readonly recipeId = signal<number | null>(null);
  readonly recipe = signal<Recipe | null>(null);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id || isNaN(id)) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }

    this.recipeId.set(id);
    this.loadRecipe(id);
  }

  private loadRecipe(id: number): void {
    this.loading.set(true);
    this.notFound.set(false);

    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        if (recipe) {
          this.recipe.set(recipe);
        } else {
          this.notFound.set(true);
        }
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }
}
