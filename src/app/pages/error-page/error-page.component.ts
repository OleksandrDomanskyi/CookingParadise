import { Component } from '@angular/core';

import { ErrorPageComponent } from '../../components/error-page/error-page.component';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [ErrorPageComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPage {

}
