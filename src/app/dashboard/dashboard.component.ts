import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  // Méthode de déconnexion
  logout() {
    // Logique de déconnexion (peut inclure la suppression du token, etc.)
    console.log('Déconnexion réussie');

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
