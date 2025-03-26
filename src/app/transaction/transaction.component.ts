import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import {ToastService} from '../core/services/toast.service';
import { AccountService } from '../core/services/accounts.service';

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
  accountBalance: number = 0; 

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private toastService: ToastService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.emitterAccountId = params.get('id') || 'defaultAccountId';
      console.log(this.emitterAccountId);
      this.loadAccountDetails();
    });
  }

  loadAccountDetails(): void {
    this.accountService.getAccountById(this.emitterAccountId).subscribe({
      next: account => {
        this.accountBalance = account.balance; // Assurez-vous que l'API retourne un champ `balance`
        console.log('Account balance:', this.accountBalance);
      },
      error: error => {
        console.error('Erreur lors de la récupération des détails du compte :', error);
      }
    });
  }

  checkAmount() {
    this.amountExceedsBalance = this.amount > this.accountBalance;
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
            this.toastService.show('✅ Transaction réalisée avec succès', 'success');
            this.router.navigate(['/home']);
            this.receiverAccountId = '';
            this.amount = 0;
            this.description = '';
          },
          error: error => {
            this.toastService.show('❌ Erreur lors de la réalisation de la transaction', 'error');
            console.error(error);
          }
        });
    }
  }


  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
