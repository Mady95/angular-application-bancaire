import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AccountDetailsComponent } from './features/account-details/account-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/:id', component: AccountDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
