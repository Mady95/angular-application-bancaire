import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://coding-bank.fly.dev'; // Ton URL d'API

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Méthode pour envoyer les informations de connexion
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // Méthode pour l'inscription
  register(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/auth/register`, user);
}


  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/current-user`, {
      headers: this.getAuthHeaders()
    });
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}
