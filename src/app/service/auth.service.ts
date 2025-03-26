import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://coding-bank.fly.dev/';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt'); // Assurez-vous que le JWT est stocké dans le localStorage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/current-user`, {
      headers: this.getAuthHeaders()
    });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}