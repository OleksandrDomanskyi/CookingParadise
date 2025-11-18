import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { User, Credentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly STORAGE_KEY = 'auth_user' as const;
  private readonly AUTH_URL: string = `${environment.apiBaseUrl}${ENDPOINTS.authentification}` as const;

  private readonly userSignal = signal<User | null>(null);
  public readonly user = this.userSignal.asReadonly();
  public readonly isAuthenticated = () => this.user() !== null;

  constructor() {
    this.loadUserFromStorage();
  }

  public login(credentials: Credentials) {
    return this.http
      .post<User>(this.AUTH_URL, {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 60,
      })
      .pipe(
        tap((user) => {
          this.persistUser(user);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.userSignal.set(null);
    this.router.navigate([''], { replaceUrl: true });
  }

  private loadUserFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return;

    try {
      const user = JSON.parse(stored) as User;
      if (user?.id && typeof user.token === 'string') {
        this.userSignal.set(user);
      } else {
        throw new Error('Invalid user structure');
      }
    } catch {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  private persistUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.userSignal.set(user);
  }
}
