import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { HomeComponent } from './features/home/home.component';
import { NgModule } from '@angular/core';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountDetailsComponent } from './features/account-details/account-details.component';
import { AuthGuard } from './auth/guards/auth.guard'; // Garder le AuthGuard pour les pages protégées

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },  // Page login
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },  // Page protégée par AuthGuard
  { path: 'account/:id', component: AccountDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuard] }, // Pas de AuthGuard ici
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  // Protégée par AuthGuard
  { path: 'login', component: LoginComponent },  // Page login (pas de AuthGuard ici)
  { path: 'register', component: RegisterComponent },  // Page register (pas de AuthGuard ici)
  { path: 'transaction/:id', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'details-transaction/:id', component: DetailsTransactionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // Redirige vers la page login par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
