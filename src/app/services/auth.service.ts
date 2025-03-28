import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://coding-bank.fly.dev';
  private userSubject = new BehaviorSubject<any | null>(null);
// Ton URL d'API

  constructor(private http: HttpClient) {}

  updateUser(user: any | null): void {
    this.userSubject.next(user);
  }

  getUserObservable(): Observable<any | null> {
    return this.userSubject.asObservable();
  }


  // Récupérer le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Générer les en-têtes d'authentification
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
  register(registrationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, registrationData);
  }

  // Obtenir les informations de l'utilisateur actuel
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/current-user`, {
      headers: this.getAuthHeaders()
    });
  }

  // Déconnexion : supprimer le token du localStorage
  logout(): void {
    localStorage.removeItem('jwt');
    sessionStorage.clear();
    this.userSubject.next(null);
  }


  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();  // Retourne true si un token existe
  }

  // Rediriger vers la page de login si l'utilisateur n'est pas connecté
  redirectToLogin(router: any): void {
    if (!this.isLoggedIn()) {
      router.navigate(['/login']);
    }
  }
}
