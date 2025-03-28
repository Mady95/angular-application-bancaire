import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importer Router
import { AuthService } from '../../services/auth.service';  // Importer AuthService
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { CommonModule } from '@angular/common'; // Importer CommonModule pour utiliser *ngFor

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Ajouter CommonModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  clientCode: string = '';
  password: string = '';

  // Liste des chiffres avec 2 cases vides ajoutées
  digits: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, null, null];

  constructor(private router: Router, private authService: AuthService) {
    this.shuffleDigits(); // Mélange les chiffres au chargement du composant
  }

  // Méthode pour mélanger les chiffres et les cases vides
  shuffleDigits(): void {
    for (let i = this.digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.digits[i], this.digits[j]] = [this.digits[j], this.digits[i]];  // Échange les éléments
    }
  }

  // Méthode pour ajouter un chiffre au mot de passe
  addDigit(digit: number | null): void {
    if (digit !== null) {
      this.password += digit;  // Ajouter le chiffre à la fin du mot de passe
    }
  }

  // Méthode pour effacer le mot de passe
  clearPassword(): void {
    this.password = '';  // Effacer le mot de passe
  }

  // Méthode pour soumettre le formulaire de connexion
  onSubmit() {
    const credentials = {
      clientCode: this.clientCode,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      response => {
        console.log('Connexion réussie', response);

        if (response && response.jwt) {
          // Sauvegarder le token dans le localStorage
          localStorage.setItem('jwt', response.jwt);
          console.log('Token stocké dans localStorage :', response.jwt);

          this.authService.updateUser(response.user);


          // Rediriger vers le dashboard
          this.router.navigate(['/home']);
        } else {
          console.error('Le token est manquant dans la réponse');
        }
      },
      error => {
        console.error('Erreur de connexion', error);
        alert('Nom d\'utilisateur ou mot de passe incorrect');
      }
    );
  }
}
