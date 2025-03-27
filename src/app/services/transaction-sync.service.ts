import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionSyncService {
  private transactionUpdateSource = new BehaviorSubject<any>(null);
  transactionUpdate$ = this.transactionUpdateSource.asObservable();

  updateTransaction(transaction: any): void {
    this.transactionUpdateSource.next(transaction);
  }
  
}
