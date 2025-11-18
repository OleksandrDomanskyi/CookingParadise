import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipes-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './recipes-table.component.html',
  styleUrl: './recipes-table.component.scss'
})
export class RecipesTableComponent {
  @Input() recipes: Recipe[] = [];

  @Output() edit = new EventEmitter<Recipe>();
  @Output() delete = new EventEmitter<number>();
  
  columns = ['image', 'name', 'cuisine', 'difficulty', 'calories', 'tags', 'action'];
}
