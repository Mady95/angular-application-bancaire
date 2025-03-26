import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://coding-bank.fly.dev/transactions';
  private apiUrl2 = 'https://coding-bank.fly.dev/accounts';
  transactions: Transaction[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  createTransaction(data: {emitterAccountId: string, receiverAccountId: string, amount: number, description: string}): Observable<any> {
    // const transaction = new Transaction(id, emitterAccountId, receiverAccountId, amount, description, date);
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/emit`, data, { headers });
  }

  getTransactionById(transactionId: string): Observable<Transaction> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Transaction>(`${this.apiUrl}/${transactionId}`, { headers });
  }

  getAllTransactions(accountId: string): Observable<Transaction[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.apiUrl2}/${accountId}/transactions`, { headers });
  }

  cancelTransaction(transactionId: number): Observable<void> {
    const transactionIndex = this.transactions.findIndex((t: { id: number; }) => t.id === transactionId);
    if (transactionIndex !== -1) {
      this.transactions.splice(transactionIndex, 1); // Remove the transaction from the local storage
      return of(void 0); // Simulate an Observable<void>
    } else {
      return of(void 0); // Simulate an Observable<void> for a non-existent transaction
    }
  }
}