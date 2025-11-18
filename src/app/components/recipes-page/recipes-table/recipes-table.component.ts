import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipes-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './recipes-table.component.html',
  styleUrl: './recipes-table.component.scss'
})
export class RecipesTableComponent {
  @Input() recipes: Recipe[] = [];
  columns = ['image', 'name', 'cuisine', 'difficulty', 'calories', 'tags', 'action'];
}
