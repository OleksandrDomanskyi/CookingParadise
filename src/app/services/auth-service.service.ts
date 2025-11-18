import { Injectable, inject, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL: string = `${environment.apiBaseUrl}${ENDPOINTS.authentification}`;

  private readonly http = inject(HttpClient);

  private _user = signal<User | null>(this.getUserFromStorage());
  user: Signal<User | null> = this._user.asReadonly();

  login(username: string, password: string) {
    return this.http.post<User>(this.URL, { username, password }).pipe(
      tap((user) => {
        this._user.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this._user();
  }

  private getUserFromStorage(): User | null {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  }
}
