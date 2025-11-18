import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesPageComponent } from '../../components/recipes-page/recipes-page.component';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [CommonModule, RecipesPageComponent],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss'
})
export class RecipesPage {

}
