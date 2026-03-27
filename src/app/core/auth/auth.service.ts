import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AppUser } from '../models/user.model';

const STORAGE_KEY = 'bw_user';

interface GisJwtPayload {
  sub: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  private readonly _user = signal<AppUser | null>(this.loadFromStorage());

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  readonly googleClientId = environment.googleClientId;

  handleCredentialResponse(response: google.accounts.id.CredentialResponse): void {
    const payload = this.decodeJwt(response.credential);
    if (!payload) return;

    const user: AppUser = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      photoUrl: payload.picture,
      firstName: payload.given_name,
      lastName: payload.family_name,
    };

    this._user.set(user);
    this.saveToStorage(user);
    this.router.navigate(['/home']);
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  private decodeJwt(token: string): GisJwtPayload | null {
    try {
      const base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64Payload)) as GisJwtPayload;
    } catch {
      return null;
    }
  }

  private saveToStorage(user: AppUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private loadFromStorage(): AppUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AppUser) : null;
    } catch {
      return null;
    }
  }
}
