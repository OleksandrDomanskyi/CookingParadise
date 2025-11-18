import { Component } from '@angular/core';

import { RecipeDetailsPageComponent } from '../../components/recipe-details-page/recipe-details-page.component';

@Component({
  selector: 'app-recipe-details-page',
  standalone: true,
  imports: [RecipeDetailsPageComponent],
  templateUrl: './recipe-details-page.component.html',
  styleUrl: './recipe-details-page.component.scss'
})
export class RecipeDetailsPage {

}
