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
  status: string = 'En attente';

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
    this.transactionService.getTransactionById(this.transactionId).subscribe(transaction => {
      this.transaction = transaction;
      this.checkStatus();
    });
  }

  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  checkStatus(): void {
    if (this.transaction) {
      const now = new Date();
      const transactionDate = new Date(this.transaction.date);
      const diffInMilliseconds = now.getTime() - transactionDate.getTime();
      const threeSecondsInMilliseconds = 3000;
  
      if (diffInMilliseconds >= threeSecondsInMilliseconds) {
        this.status = 'Validé';
      } else {
        this.status = 'En attente';
        const remainingTime = threeSecondsInMilliseconds - diffInMilliseconds;
  
        // Passe automatiquement à "Validé" après le temps restant
        setTimeout(() => {
          this.status = 'Validé';
        }, remainingTime);
      }
    }
  }

  cancelTransaction(): void {
    if (this.transaction) {
      this.transactionService.cancelTransaction(this.transaction.id).subscribe(() => {
        window.alert('Transaction annulée avec succès');
        this.router.navigate(['/home']);
      });
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
