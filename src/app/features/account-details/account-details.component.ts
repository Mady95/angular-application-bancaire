import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../../core/services/accounts.service';
import { ToastService } from '../../core/services/toast.service';
import { appConfig } from '../../app.config'; // Correct

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  imports: [CommonModule],
})
export class AccountDetailsComponent implements OnInit {
  accountDetails: Account | null = null;
  copied = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      // Si useMockRepository est activé, utiliser les données en mémoire
      if (appConfig.useMockRepository) {
        // Remplacer la logique avec des données simulées (en mémoire)
        this.accountDetails = {
          id: '123456',
          label: 'OpinelZedou account',
          openAt: new Date('2022-01-01'),
          balance: 1250.99,
          maskedNumber: '**** **** **** 1234',  // Ajout de la propriété 'maskedNumber' simulée
        };
      } else {
        // Sinon, récupérer les données réelles via l'API
        this.accountService.getAccountById(accountId).subscribe((data) => {
          this.accountDetails = data;
          console.log('Account Details:', this.accountDetails);
          if (this.accountDetails && this.accountDetails.openAt) {
            this.accountDetails.openAt = new Date(this.accountDetails.openAt);
          }
        });
      }
    }
  }

  // Fonction pour revenir à l'accueil
  goBack(): void {
    if (this.accountDetails) {
      localStorage.setItem('selectedAccountId', this.accountDetails.id);
    }
    this.router.navigate(['/']);
  }

  // Fonction pour copier l'ID du compte
  copy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.copied = true;
      this.toastService.show('📋 Id compte copié !', 'info');
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }
}
