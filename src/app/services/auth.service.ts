import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://coding-bank.fly.dev'; // Ton URL d'API

  constructor(private http: HttpClient) {}

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
    localStorage.removeItem('jwt'); // Supprimer le token du localStorage
    sessionStorage.clear(); 
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
