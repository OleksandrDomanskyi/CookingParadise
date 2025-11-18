import { Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipes-pagination',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './recipes-pagination.component.html',
  styleUrl: './recipes-pagination.component.scss'
})
export class RecipesPaginationComponent {
  @Input() total = 0;
  @Input() limit = 10;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  totalPages = computed(() => Math.ceil(this.total / this.limit) || 1);
}
