import { Component } from '@angular/core';

import { LoginPageComponent } from '../../components/login-page/login-page.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginPageComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPage {

}
