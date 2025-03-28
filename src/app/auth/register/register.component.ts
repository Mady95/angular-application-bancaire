import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Assurez-vous que ce chemin est correct
import { Router } from '@angular/router';  // Importer le Router
import { HttpErrorResponse } from '@angular/common/http';  // Importer HttpErrorResponse
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationCode: string = '';  // Variable pour stocker le code d'inscription

  passwordDigits: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, null, null];
  activeField: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.shuffleDigits(this.passwordDigits);
  }

  shuffleDigits(digits: (number | null)[]): void {
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
  }

  addDigit(digit: number | null): void {
    if (digit !== null) {
      if (this.activeField === 'password') {
        this.password += digit;
      } else if (this.activeField === 'confirmPassword') {
        this.confirmPassword += digit;
      }
    }
  }

  setActiveField(field: string): void {
    this.activeField = field;
  }

  clearPasswords(): void {
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }

    if (!this.name) {
      alert("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }

    const registrationData = {
      name: this.name,
      password: this.password
    };

    this.authService.register(registrationData).subscribe(
      (response: any) => {
        console.log('Réponse serveur:', response); // Affiche la réponse du serveur dans la console

        // Assigner le code d'inscription ou un message générique
        if (response && response.clientCode) {
          this.registrationCode = `Votre code d'inscription est : ${response.clientCode}`;
        } else {
          this.registrationCode = 'Inscription réussie, mais aucun code d\'inscription fourni.';
        }
        localStorage.setItem("jwt", response.jwt);
        this.authService.updateUser(response.user);

        // Stocker le token dans le localStorage
        // Redirection vers la page profile avec le code d'inscription
        this.router.navigate(['/profile'], { state: { clientCode: response.clientCode, name: this.name } });
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'inscription', error);
        alert(`Une erreur est survenue lors de l'inscription : ${error.error.message}`);
      }
    );
  }

}
