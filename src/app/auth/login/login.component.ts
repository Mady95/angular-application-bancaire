import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Simuler un appel au backend (avec InMemoryWebApi)
    console.log('Login Attempt', this.username, this.password);

    // Rediriger vers le tableau de bord après la connexion réussie
    this.router.navigate(['/dashboard']);
  }
}
