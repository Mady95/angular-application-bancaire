import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  myAccountId: string = ''; 
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
      
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.myAccountId = 'b2edc4d9-5a7c-4adf-822a-7d48bef17df5'; // Remplacez 'defaultAccountId' par une valeur par défaut valide
    console.log(this.myAccountId);

    if (this.myAccountId) {
      this.loadTransactions();
    } else {
      console.error('Account ID is missing!');
    }
  });
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions(this.myAccountId).subscribe(transactions => {
      this.transactions = transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    });
  }
  

  get paginatedTransactions(): Transaction[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.transactions.slice(startIndex, startIndex + this.pageSize);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  formatDate(date: Date): string {
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const, hour: '2-digit' as const, minute: '2-digit' as const };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.transactions.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}