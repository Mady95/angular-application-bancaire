import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';  // Importer la configuration correctement

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/api';  // URL de l'API réelle

  constructor(private http: HttpClient) {}

  // Fonction pour récupérer les détails du compte
  getAccountById(accountId: string): Observable<any> {
    if (appConfig.useMockRepository) {
      // Retourner les données en mémoire pour les tests/démonstrations
      return of({
        id: '123456',
        label: 'Compte Principal',
        openAt: new Date('2022-01-01'),
        balance: 1250.50,
      });
    } else {
      // Sinon, effectuer une requête HTTP à l'API
      return this.http.get<any>(`${this.apiUrl}/account-details/${accountId}`);
    }
  }
}
