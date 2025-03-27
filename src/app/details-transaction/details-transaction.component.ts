import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../core/services/accounts.service';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../services/transaction.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
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
          window.alert('Transaction annulée avec succès');
          this.transaction.status = 'cancelled'; // Met à jour le statut localement
          this.router.navigate(['/home']); // Redirige vers la page d'accueil
        },
        error: error => {
          console.error('Erreur lors de l\'annulation de la transaction :', error);
          window.alert('Erreur lors de l\'annulation de la transaction');
        }
      });
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
