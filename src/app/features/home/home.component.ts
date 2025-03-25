import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../../core/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccount: Account | null = null;

  transactions = [
    {
      type: 'Dépot',
      amount: 500,
      date: new Date('2025-01-25')
    },
    {
      type: 'Retrait',
      amount: -120,
      date: new Date('2025-01-24')
    }
  ];


  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du compte depuis localStorage
    const savedAccountId = localStorage.getItem('selectedAccountId');
    
    // Charger tous les comptes
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;

      if (savedAccountId) {
        // Si un accountId est trouvé dans localStorage, charge le compte correspondant
        this.selectedAccount = this.accounts.find(account => account.id === savedAccountId) || null;
      } else {
        // Si aucun compte n'est trouvé dans localStorage, on prend le premier compte par défaut
        if (data.length > 0) {
          this.selectedAccount = data[0]; // Le premier compte par défaut
        }
      }
    });
  }
  handleAccountChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedAccount = this.accounts.find(acc => acc.id === selectedId) || null;
  }

  goToAccountDetails(): void {
    if (this.selectedAccount) {
      this.router.navigate(['/account', this.selectedAccount.id]);
    }
  }
}
