import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AccountDetailsComponent } from './features/account-details/account-details.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {ProfileComponent} from './profile/profile.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/:id', component: AccountDetailsComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'all-transactions', component: AllTransactionsComponent },
  { path: 'details-transaction/', component: DetailsTransactionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

