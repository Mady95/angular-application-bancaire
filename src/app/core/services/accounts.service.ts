import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private apiUrl = '/https://coding-bank.fly.dev/api#/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAccountTransactions(accountId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${accountId}/transactions`);
  }

  getAccountDetails(accountId: string): Observable<any> {
    return this.http.get(`/accounts/${accountId}`);
  }
  
}
