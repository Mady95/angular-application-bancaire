import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsService } from '../../core/services/accounts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule],
})
export class HomeComponent {
  accounts: any[] = [];
  selectedAccount: any = null;
  transactions: any[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountsService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        if (this.accounts.length > 0) {
          this.selectAccount(this.accounts[0].id); // Sélectionne le premier compte par défaut
        }
      },
      error: (err) => console.error('Erreur lors de la récupération des comptes', err)
    });
  }

  selectAccount(accountId: string): void {
    const account = this.accounts.find(acc => acc.id === accountId);
    if (account) {
      this.selectedAccount = account;
      this.fetchTransactions(account.id);
    }
  }

  fetchTransactions(accountId: string): void {
    this.accountsService.getAccountTransactions(accountId).subscribe({
      next: (data) => (this.transactions = data),
      error: (err) => console.error('Erreur lors de la récupération des transactions', err)
    });
  }

  handleAccountChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const accountId = selectElement.value;
    this.selectAccount(accountId);
  }
}
