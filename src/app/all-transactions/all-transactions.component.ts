import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../core/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {
  transactions: any[] = [];
  selectedAccount: any = null;
  accounts: any[] = [];
  currentPage: number = 1; // Page actuelle
  pageSize: number = 10; // Nombre de transactions par page
  totalTransactions: number = 0; // Nombre total de transactions
Math: any;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        const savedAccountId = localStorage.getItem('selectedAccountId');
        if (savedAccountId) {
          this.selectedAccount = this.accounts.find(acc => acc.id === savedAccountId) || null;
        } else if (this.accounts.length > 0) {
          this.selectedAccount = this.accounts[0];
        }
        if (this.selectedAccount) {
          this.loadTransactions(this.selectedAccount.id, this.currentPage);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des comptes :', error);
      }
    });
  }

  loadTransactions(accountId: string, page: number): void {
    this.accountService.getTransactionsByAccountId(accountId).subscribe({
      next: (transactions) => {
        this.totalTransactions = transactions.length;
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.transactions = transactions.slice(startIndex, endIndex); // Transactions paginées
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des transactions :', error);
      }
    });
  }

  handleAccountChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedAccount = this.accounts.find(acc => acc.id === selectedId) || null;
    if (this.selectedAccount) {
      localStorage.setItem('selectedAccountId', this.selectedAccount.id);
      this.currentPage = 1; // Réinitialise à la première page
      this.loadTransactions(this.selectedAccount.id, this.currentPage);
    }
  }

  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  goToDetailsTransaction(transactionId: string): void {
    this.router.navigate(['/details-transaction', transactionId]);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalTransactions / this.pageSize)) {
      this.currentPage = page;
      this.loadTransactions(this.selectedAccount.id, this.currentPage);
    }
  }
  goToTransaction(): void {
    if (this.selectedAccount?.id) {
      this.router.navigate(['/transaction', this.selectedAccount.id]);
    } else {
      window.alert('Veuillez sélectionner un compte avant de créer une transaction.');
    }
  }
  getTotalPages(): number[] {
    return Array.from({ length: Math.ceil(this.totalTransactions / this.pageSize) }, (_, i) => i + 1);
  }
  
  goToHome(): void {
    this.router.navigate(['/home']);
  }
}