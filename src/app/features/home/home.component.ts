import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../../core/services/accounts.service';
import { Router } from '@angular/router';
import {ToastService} from '../../core/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccount: Account | null = null;

  transactions: any[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const savedAccountId = localStorage.getItem('selectedAccountId');

    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;

      if (savedAccountId) {
        this.selectedAccount = this.accounts.find(account => account.id === savedAccountId) || null;
      } else if (data.length > 0) {
        this.selectedAccount = data[0];
      }

      if (this.selectedAccount) {
        this.loadTransactions(this.selectedAccount.id);
      }
    });
  }

  handleAccountChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedAccount = this.accounts.find(acc => acc.id === selectedId) || null;

    if (this.selectedAccount) {
      localStorage.setItem('selectedAccountId', this.selectedAccount.id);
      this.loadTransactions(this.selectedAccount.id);
    }
  }

  goToAccountDetails(): void {
    if (this.selectedAccount) {
      this.router.navigate(['/account', this.selectedAccount.id]);
    }
  }

  goToAddAccount() {
    this.router.navigate(['/create-account']);
  }

  loadTransactions(accountId: string): void {
    this.accountService.getTransactionsByAccountId(accountId).subscribe(transactions => {
      this.transactions = transactions
        .sort((a, b) => new Date(b.emittedAt).getTime() - new Date(a.emittedAt).getTime()) // ordre décroissant
        .slice(0, 5);
    });
  }

  hasTransactions(): boolean {
    return Array.isArray(this.transactions) && this.transactions.length > 0;
  }

  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  goToTransaction(): void {
    if (this.selectedAccount?.id) {
      this.router.navigate(['/transaction', this.selectedAccount.id]);
    } else {
      window.alert('Veuillez sélectionner un compte avant de créer une transaction.');
    }
  }

  goToDetailsTransaction(transactionId: string): void {
    this.router.navigate(['/details-transaction', transactionId]);
  }

  copied = false;

  copy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.copied = true;

      this.toastService.show('📋 Code client copié !', 'info');

      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }



  logout() {
    // Logique de déconnexion (peut inclure la suppression du token, etc.)
    console.log('Déconnexion réussie');

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
