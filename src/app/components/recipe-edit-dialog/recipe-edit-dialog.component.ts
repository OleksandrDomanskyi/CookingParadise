import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { Recipe } from '../../models/recipe.model';
import { EditRecipeData } from '../../models/edit-recipe.model';

@Component({
  selector: 'app-recipe-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './recipe-edit-dialog.component.html',
  styleUrl: './recipe-edit-dialog.component.scss'
})
export class RecipeEditDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<RecipeEditDialogComponent>);
  private readonly data = inject<EditRecipeData>(MAT_DIALOG_DATA);

  readonly editForm: FormGroup;
  readonly tags = signal<string[]>([]);
  readonly ingredients = signal<string[]>([]);
  readonly instructions = signal<string[]>([]);

  constructor() {
    const r = this.data.recipe;

    this.editForm = new FormGroup({
      name: new FormControl(r.name, Validators.required),
      cuisine: new FormControl(r.cuisine, Validators.required),
      cookTimeMinutes: new FormControl(r.cookTimeMinutes, [Validators.required, Validators.min(1)]),
      servings: new FormControl(r.servings, [Validators.required, Validators.min(1)]),
      caloriesPerServing: new FormControl(r.caloriesPerServing, [Validators.required, Validators.min(0)]),
      difficulty: new FormControl(r.difficulty, Validators.required),
    });

    this.tags.set([...r.tags]);
    this.ingredients.set([...r.ingredients]);
    this.instructions.set([...r.instructions]);
  }

  addTag(value: string): void {
    const trimmed = value.trim();
    if (trimmed && !this.tags().includes(trimmed)) {
      this.tags.update(tags => [...tags, trimmed]);
    }
  }

  removeTag(tag: string): void {
    this.tags.update(tags => tags.filter(t => t !== tag));
  }

  addIngredient(value: string): void {
    const trimmed = value.trim();
    if (trimmed) this.ingredients.update(i => [...i, trimmed]);
  }

  removeIngredient(index: number): void {
    this.ingredients.update(i => i.filter((_, idx) => idx !== index));
  }

  addStep(value: string): void {
    const trimmed = value.trim();
    if (trimmed) this.instructions.update(s => [...s, trimmed]);
  }

  removeStep(index: number): void {
    this.instructions.update(s => s.filter((_, idx) => idx !== index));
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updated: Recipe = {
        ...this.data.recipe,
        ...this.editForm.getRawValue(),
        tags: this.tags(),
        ingredients: this.ingredients(),
        instructions: this.instructions(),
      };
      this.dialogRef.close(updated);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
