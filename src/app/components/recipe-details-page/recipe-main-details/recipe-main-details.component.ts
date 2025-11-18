import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-main-details',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './recipe-main-details.component.html',
  styleUrl: './recipe-main-details.component.scss'
})
export class RecipeMainDetailsComponent {
  @Input({ required: true }) recipe!: Recipe;

  @Output() edit = new EventEmitter<Recipe>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.recipe);
  }

  onDelete(): void {
    const confirmed = confirm(`Delete recipe "${this.recipe.name}"?`);
    if (confirmed) {
      this.delete.emit(this.recipe.id);
    }
  }
}
