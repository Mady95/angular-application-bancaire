import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Account {
  id: string;
  label: string;
  balance: number;
}

export interface Transaction {
  id: string;
  emitter: { id: string; owner: { name: string } };
  receiver: { id: string; owner: { name: string } };
  amount: number;
  description: string;
  emittedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: Account[] = [
    { id: '1', label: 'Compte courant', balance: 1500.5 },
    { id: '2', label: 'Livret A', balance: 3000.0 },
  ];

  private transactions: Transaction[] = [
    {
      id: '1',
      emitter: { id: '1', owner: { name: 'John Doe' } },
      receiver: { id: '2', owner: { name: 'Jane Doe' } },
      amount: 100.0,
      description: 'Virement pour loyer',
      emittedAt: '2025-03-25T10:00:00Z',
    },
    {
      id: '2',
      emitter: { id: '2', owner: { name: 'Jane Doe' } },
      receiver: { id: '1', owner: { name: 'John Doe' } },
      amount: 50.0,
      description: 'Remboursement',
      emittedAt: '2025-03-26T14:00:00Z',
    },
  ];

  getAccounts(): Observable<Account[]> {
    return of(this.accounts);
  }

  getTransactionsByAccountId(accountId: string): Observable<Transaction[]> {
    return of(
      this.transactions.filter(
        (transaction) =>
          transaction.emitter.id === accountId || transaction.receiver.id === accountId
      )
    );
  }
}
