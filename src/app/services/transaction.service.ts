import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://coding-bank.fly.dev/transactions';
  private apiUrl2 = 'https://coding-bank.fly.dev/accounts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  createTransaction(data: {
    emitterAccountId: string;
    receiverAccountId: string;
    amount: number;
    description: string;
  }): Observable<any> {
    console.log('Payload:', data);
    return this.http.post(`${this.apiUrl}/emit`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getTransactionById(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${transactionId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getAllTransactions(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl2}/${accountId}/transactions`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  cancelTransaction(transactionId: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${transactionId}/cancel`, {}, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur API:', error);
    let errorMessage = 'Une erreur est survenue';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
