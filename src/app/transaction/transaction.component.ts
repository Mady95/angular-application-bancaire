import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  id!: number;
  emitterAccountId: string = 'myAccountId'; // Replace with actual account ID
  receiverAccountId!: string;
  amount!: number;
  description!: string;
  date: Date = new Date();
  amountExceedsBalance: boolean = false;
  accountBalance: number = 100; 

  constructor(private transactionService: TransactionService, private router: Router) {}

  checkAmount() {
    this.amountExceedsBalance = this.amount > this.accountBalance;
  }

  onSubmit() {
    if (!this.amountExceedsBalance) {
      this.transactionService.createTransaction(this.id, this.emitterAccountId, this.receiverAccountId, this.amount, this.description, this.date)
        .subscribe({
          next: response => {
            window.alert('Transaction réalisée avec succès');
            this.router.navigate(['/all-transactions']);
            this.receiverAccountId = '';
            this.amount = 0;
            this.description = '';
          },
          error: error => {
            window.alert('Erreur lors de la réalisation de la transaction');
          }
        });
    }
  }
}