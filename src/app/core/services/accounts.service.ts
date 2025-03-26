import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export interface Account {
  id: string;
  label: string;
  balance: number;
  maskedNumber: string;
  openAt : Date;
}


@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'https://coding-bank.fly.dev/accounts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createAccount(data: { label: string; initialBalance: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
  })
  }

  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getTransactionsByAccountId(accountId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${accountId}/transactions`, {
      headers: this.authService.getAuthHeaders()
    });
  }


}




