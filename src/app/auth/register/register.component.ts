import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Si le service est dans src/app/services/
import { Router } from '@angular/router'; // Pour rediriger après l'inscription
import { HttpErrorResponse } from '@angular/common/http';  // Pour gérer les erreurs HTTP
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule pour utiliser *ngIf

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Ajouter CommonModule ici
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';  // Nom d'utilisateur
  password: string = '';
  confirmPassword: string = '';

  // Liste des chiffres pour le mot de passe et la confirmation du mot de passe
  passwordDigits: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, null, null];
  confirmPasswordDigits: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, null, null];

  constructor(private authService: AuthService, private router: Router) {}

  // Mélanger les chiffres pour les deux champs
  shuffleDigits(digits: (number | null)[]): void {
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];  // Échange les éléments
    }
  }

  ngOnInit(): void {
    this.shuffleDigits(this.passwordDigits); // Mélanger les chiffres pour le mot de passe
    this.shuffleDigits(this.confirmPasswordDigits); // Mélanger les chiffres pour la confirmation du mot de passe
  }

  // Méthode pour ajouter un chiffre au mot de passe
  addPasswordDigit(digit: number | null): void {
    if (digit !== null) {
      this.password += digit;  // Ajouter le chiffre à la fin du mot de passe
    }
  }

  // Méthode pour ajouter un chiffre à la confirmation du mot de passe
  addConfirmPasswordDigit(digit: number | null): void {
    if (digit !== null) {
      this.confirmPassword += digit;  // Ajouter le chiffre à la fin de la confirmation du mot de passe
    }
  }

  // Méthode pour effacer les mots de passe
  clearPasswords(): void {
    this.password = '';  // Effacer le mot de passe
    this.confirmPassword = '';  // Effacer la confirmation du mot de passe
  }

  // Méthode pour soumettre le formulaire d'inscription
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }

    // Validation supplémentaire pour le champ `name` (nom d'utilisateur)
    if (!this.name) {
      alert("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }

    const registrationData = {
      name: this.name,   // Utiliser 'name' comme attendu par l'API
      password: this.password // 'password' reste inchangé
    };

    // Appeler la méthode register() du service AuthService
    this.authService.register(registrationData).subscribe(
      (response: any) => {  // Typage explicite de 'response'
        console.log('Inscription réussie', response);
        this.router.navigate(['/login']);  // Rediriger vers la page de login après inscription réussie
      },
      (error: HttpErrorResponse) => {  // Typage explicite de 'error'
        console.error('Erreur lors de l\'inscription', error);
        alert(`Une erreur est survenue lors de l'inscription : ${error.error.message}`);
      }
    );
  }
}
