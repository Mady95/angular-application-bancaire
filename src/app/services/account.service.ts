import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://coding-bank.fly.dev';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createAccount(data: { label: string; initialBalance: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts`, data, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
