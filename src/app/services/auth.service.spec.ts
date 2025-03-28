import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Vérifier si l'utilisateur est connecté en fonction de la présence du token
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');  // Vérifie la présence du token
  }

  // Méthode de déconnexion
  logout(): void {
    localStorage.removeItem('jwt');  // Supprime le token du localStorage
  }
}
