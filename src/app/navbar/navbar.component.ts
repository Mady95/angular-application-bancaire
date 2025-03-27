import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router){}

  logout() {
    // Logique de déconnexion (peut inclure la suppression du token, etc.)
    console.log('Déconnexion réussie');

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}

