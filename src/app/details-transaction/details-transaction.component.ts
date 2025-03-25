import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-details-transaction',
  standalone : true,
  imports: [BrowserModule],
  providers: [DatePipe],
  templateUrl: './details-transaction.component.html',
  styleUrl: './details-transaction.component.scss'
})
export class DetailsTransactionComponent implements OnInit {
  transaction: Transaction | undefined;
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

  checkStatus(): void {
    if (this.transaction) {
      const now = new Date();
      const transactionDate = new Date(this.transaction.date);
      const diffInHours = (now.getTime() - transactionDate.getTime()) / 1000 / 60 / 60;
      this.status = diffInHours >= 5 ? 'Validé' : 'En attente';
    }
  }

  cancelTransaction(): void {
    if (this.transaction) {
      this.transactionService.cancelTransaction(this.transaction.id).subscribe(() => {
        window.alert('Transaction annulée avec succès');
        this.router.navigate(['/all-transactions']);
      });
    }
  }

  goToTransaction(): void {
    this.router.navigate(['/transaction']);
  }
}
