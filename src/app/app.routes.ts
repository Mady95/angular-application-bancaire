import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AccountDetailsComponent } from './features/account-details/account-details.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {ProfileComponent} from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/:id', component: AccountDetailsComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
