import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  emitterAccountId: string = ''; 
  receiverAccountId!: string;
  amount!: number;
  description!: string;
  amountExceedsBalance: boolean = false;
  accountBalance: number = 2450.85; 

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  checkAmount() {
    this.amountExceedsBalance = this.amount > this.accountBalance;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.emitterAccountId = params.get('id') || 'defaultAccountId';
      console.log(this.emitterAccountId)
    });
  }

  onSubmit() {
    if (!this.amountExceedsBalance) {
      const transactionData = {
        emitterAccountId: this.emitterAccountId,
        receiverAccountId: this.receiverAccountId,
        amount: this.amount,
        description: this.description
      };

      this.transactionService.createTransaction(transactionData)
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