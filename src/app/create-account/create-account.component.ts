import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../core/services/accounts.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {CommonModule} from "@angular/common";
import {ToastService} from "../core/services/toast.service";

@Component({
  selector: 'app-create-account',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  accountForm!: FormGroup;
  userName: string = '';
  message: string = '';
  messageType: 'success' | 'error' | '' = '';


  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
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
        this.toastService.show('✅ Compte créé avec succès !', 'success');
        this.accountForm.reset();

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erreur création de compte :', err);
        this.toastService.show('❌ Une erreur est survenue. Veuillez réessayer.', 'error');
      }
    });


  }
}
