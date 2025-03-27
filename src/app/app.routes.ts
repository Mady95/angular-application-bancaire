import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {ProfileComponent} from './profile/profile.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { HomeComponent } from './features/home/home.component';
import { NgModule } from '@angular/core';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountDetailsComponent } from './features/account-details/account-details.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'home', component: HomeComponent },
  { path: 'account/:id', component: AccountDetailsComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'transaction/:id', component: TransactionComponent },
  { path: 'details-transaction/:id', component: DetailsTransactionComponent },
  { path: 'account/:id/transactions', component: AllTransactionsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

