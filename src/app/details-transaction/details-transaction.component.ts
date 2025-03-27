import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../core/services/accounts.service';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../services/transaction.service';
import {ToastService} from '../core/services/toast.service';
import { TransactionSyncService } from '../services/transaction-sync.service';

@Component({
  selector: 'app-details-transaction',
  standalone : true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './details-transaction.component.html',
  styleUrl: './details-transaction.component.scss'
})
export class DetailsTransactionComponent implements OnInit {
  transaction: any;
  selectedAccount: Account | null = null;
  transactions: any[] = [];
  transactionId: string = '';
  transactionStatus: string = '';
  copied = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastService: ToastService,
    private transactionSyncService: TransactionSyncService,
  ) {}

  ngOnInit(): void {
    const selectedAccountId = localStorage.getItem('selectedAccountId');
  if (selectedAccountId) {
    this.accountService.getAccountById(selectedAccountId).subscribe(account => {
      this.selectedAccount = account;
    });
  }
    this.transactionId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTransaction();
  }

  loadTransaction(): void {
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next: (transaction) => {
        if (transaction) {
          this.transaction = transaction;
          this.transactionStatus = transaction.status;
          this.startStatusCheck();
        } else {
          console.error('Transaction non trouvée');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la transaction', error);
      }
    });
  }

  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  startStatusCheck(): void {
    if (this.transactionStatus === 'pending') {
      setTimeout(() => {
        this.transactionStatus = 'completed';
        this.transaction.status = 'completed';
        console.log('Statut mis à jour :', this.transactionStatus);
      }, 3000);
    }
  }

  cancelTransaction(): void {
    if (this.transaction) {
      this.transactionService.cancelTransaction(this.transaction.id).subscribe({
        next: () => {
          this.toastService.show('❌ Transaction annulée avec succès.', 'success');
          this.transaction.status = 'cancelled';
          this.transactionStatus = 'cancelled';
          this.transactionSyncService.updateTransaction(this.transaction);
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Erreur lors de l\'annulation de la transaction :', error);
          this.toastService.show('⚠️ Erreur lors de l’annulation de la transaction.', 'error'); // ✅ toast
        }
      });
    }
  }

  retryTransaction(): void {
    if (!this.transaction) return;
  
    const retryPayload = {
      emitterAccountId: this.transaction.emitter.id,
      receiverAccountId: this.transaction.receiver.id,
      amount: this.transaction.amount,
      description: this.transaction.description,
    };
  
    this.transactionService.createTransaction(retryPayload).subscribe({
      next: (newTransaction) => {
        this.toastService.show('✅ Transaction relancée avec succès.', 'success');
        // Met à jour l'id et recharge les détails avec la nouvelle transaction créée
        this.transactionId = newTransaction.id;
        this.router.navigate(['/details-transaction', this.transactionId]); // optionnel pour actualiser l'URL
        this.loadTransaction(); // Recharge les détails de la transaction immédiatement
      },
      error: (error) => {
        console.error('Erreur lors du réessai de la transaction :', error);
        this.toastService.show('⚠️ Échec lors du réessai de la transaction.', 'error');
      }
    });
  }
  
  


  goToHome(): void {
    this.router.navigate(['/home']);
  }

  getFormattedAmount(): { sign: string, class: string } {
    if (!this.transaction || !this.selectedAccount) {
      return { sign: '', class: '' };
    }
  
    if (this.transaction.status === 'canceled') {
      return { sign: '-', class: 'text-danger text-decoration-line-through' }; // Rouge et barré pour les transactions annulées
    }
  
    const isDebit = this.selectedAccount.id === this.transaction.emitter.id;
    return {
      sign: isDebit ? '-' : '+',
      class: isDebit ? 'text-danger' : 'text-success' // Rouge pour les débits, vert pour les crédits
    };
  }

  
  copy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.copied = true;
      this.toastService.show('📋 Id transaction copié !', 'info');
      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }
}
