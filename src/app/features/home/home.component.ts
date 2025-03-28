import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../../core/services/accounts.service';
import { Router } from '@angular/router';
import {ToastService} from '../../core/services/toast.service';
import { TransactionSyncService } from '../../services/transaction-sync.service';

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
    private toastService: ToastService,
    private transactionSyncService: TransactionSyncService
  ) {}


  ngOnInit(): void {
    const savedAccountId = localStorage.getItem('selectedAccountId');

    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;

      if (savedAccountId) {
        // Essayer de récupérer le compte sauvegardé
        this.selectedAccount = this.accounts.find(account => account.id === savedAccountId) || null;
      }

      // Si aucun compte sélectionné n'est trouvé, prendre le premier
      if (!this.selectedAccount && data.length > 0) {
        this.selectedAccount = data[0];
        localStorage.setItem('selectedAccountId', this.selectedAccount.id);
      }

      // Charger les transactions du compte sélectionné
      if (this.selectedAccount) {
        this.loadTransactions(this.selectedAccount.id);
      }

      this.transactionSyncService.transactionUpdate$.subscribe((updatedTransaction) => {
        if (updatedTransaction) {
          this.updateTransactionInList(updatedTransaction);
        }
      });
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
      .filter(transaction => {
        // Inclure les transactions annulées uniquement si le compte est l'émetteur
        return transaction.status !== 'canceled' || transaction.emitter.id === accountId;
      })
        .sort((a, b) => new Date(b.emittedAt).getTime() - new Date(a.emittedAt).getTime()) // ordre décroissant
        .slice(0, 5);
    });
  }

  hasTransactions(): boolean {
    return Array.isArray(this.transactions) && this.transactions.length > 0;
  }
  goToAllTransactions(): void {
    if (this.selectedAccount) {
      this.router.navigate(['/all-transactions']);
    }
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

      this.toastService.show('📋 Id compte copié !', 'info');

      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }

  updateTransactionInList(updatedTransaction: any): void {
    if (this.selectedAccount?.id === updatedTransaction.emitter.id) {
      // Si le compte sélectionné est l'émetteur, mettez à jour ou ajoutez la transaction annulée
      const transaction = this.transactions.find(t => t.id === updatedTransaction.id);
      if (transaction) {
        transaction.status = 'canceled'; // Met à jour le statut
      } else {
        // Ajoutez la transaction annulée si elle n'existe pas déjà
        this.transactions.push(updatedTransaction);
      }
    } else if (this.selectedAccount?.id === updatedTransaction.receiver.id) {
      // Si le compte sélectionné est le receveur, retirez la transaction annulée
      this.transactions = this.transactions.filter(t => t.id !== updatedTransaction.id);
    }
  }

  logout() {
    // Logique de déconnexion (peut inclure la suppression du token, etc.)
    console.log('Déconnexion réussie');

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
