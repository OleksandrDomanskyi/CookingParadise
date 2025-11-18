import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-instructions',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIcon],
  templateUrl: './recipe-instructions.component.html',
  styleUrl: './recipe-instructions.component.scss'
})
export class RecipeInstructionsComponent {
  @Input({ required: true }) instructions!: string[];
}
