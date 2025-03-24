import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AccountDetailsComponent } from './features/account-details/account-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Page d'accueil
    { path: 'account/:id', component: AccountDetailsComponent }, // Détails d'un compte
    { path: '**', redirectTo: '' } // Redirection par défaut
  ];
