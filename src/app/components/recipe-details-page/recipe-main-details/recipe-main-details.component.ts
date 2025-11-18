import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-main-details',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule],
  templateUrl: './recipe-main-details.component.html',
  styleUrl: './recipe-main-details.component.scss'
})
export class RecipeMainDetailsComponent {
  @Input({ required: true }) recipe!: Recipe;
}
