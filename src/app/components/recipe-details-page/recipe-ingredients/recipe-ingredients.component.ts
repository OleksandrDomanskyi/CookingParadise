import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-ingredients',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './recipe-ingredients.component.html',
  styleUrl: './recipe-ingredients.component.scss'
})
export class RecipeIngredientsComponent {
  @Input({ required: true }) ingredients!: string[];
}
