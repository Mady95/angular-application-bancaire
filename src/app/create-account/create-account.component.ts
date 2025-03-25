import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../services/account.service';
import {AuthService} from '../services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-create-account',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  accountForm!: FormGroup;
  userName: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.accountForm = this.fb.group({
      label: ['', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]]
    });

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.userName = user.name;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’utilisateur :', err);
      }
    });
  }

  createAccount() {
    if (this.accountForm.invalid) return;

    const formData = this.accountForm.value;

    this.accountService.createAccount(formData).subscribe({
      next: () => {
        alert('Compte créé avec succès !');
        this.accountForm.reset();
      },
      error: (err) => {
        console.error('Erreur création de compte :', err);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
  }
}
