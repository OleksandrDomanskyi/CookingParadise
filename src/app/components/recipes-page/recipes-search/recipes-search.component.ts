import { Component, EventEmitter, Input, Output, inject, signal, computed } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { RecipeService } from '../../../services/recipe-service.service';

@Component({
  selector: 'app-recipes-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './recipes-search.component.html',
  styleUrl: './recipes-search.component.scss',
})
export class RecipesSearchComponent {
  private readonly recipesService = inject(RecipeService);

  @Input() search = '';
  @Input() selectedTag = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() tagChange = new EventEmitter<string>();

  searchValue = signal('');
  tagValue = signal('');

  allTags = this.recipesService.tags;

  filteredTags = computed(() => {
    const q = this.tagValue().toLowerCase();
    return q
      ? this.allTags().filter(t => t.toLowerCase().includes(q))
      : this.allTags();
  });

  constructor() {
    this.searchValue.set(this.search);
    this.tagValue.set(this.selectedTag);

    if (this.allTags().length === 0) {
      this.recipesService.loadTags();
    }
  }

  updateSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.set(value);
    this.searchChange.emit(value.trim());
  }

  updateTag(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.tagValue.set(value);
    this.tagChange.emit(value);
  }

  selectTag(tag: string) {
    this.tagValue.set(tag);
    this.tagChange.emit(tag);
  }

  clearTag() {
    this.tagValue.set('');
    this.tagChange.emit('');
  }
}