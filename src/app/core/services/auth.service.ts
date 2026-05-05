import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface LoginRequest { email: string; password: string; }
export interface JwtResponse { token: string; email: string; role: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  currentUser = signal<JwtResponse | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem('user');
    if (stored) this.currentUser.set(JSON.parse(stored));
  }

  login(req: LoginRequest) {
    return this.http.post<JwtResponse>(`${this.apiUrl}/auth/login`, req);
  }

  saveUser(user: JwtResponse) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    this.currentUser.set(user);
  }

  logout() {
    localStorage.clear();
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  isAdmin() { return this.currentUser()?.role === 'ADMIN'; }
  isLoggedIn() { return !!this.currentUser(); }
  getToken() { return localStorage.getItem('token'); }
}
