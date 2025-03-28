import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://coding-bank.fly.dev';
  private userSubject = new BehaviorSubject<any | null>(null); // 💡 utilisateur connecté

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.fetchCurrentUser().subscribe(user => {
        this.userSubject.next(user);
      });
    }
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  fetchCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/current-user`, {
      headers: this.getAuthHeaders()
    });
  }

  getUserObservable(): Observable<any | null> {
    return this.userSubject.asObservable();
  }

  updateUser(user: any | null): void {
    this.userSubject.next(user);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.userSubject.next(null);
  }
}
