import { Routes } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';

export const routes: Routes = [
    { path : '', redirectTo: '/transaction', pathMatch: 'full' },
    { path: 'transaction', component: TransactionComponent },
    { path: 'all-transactions', component: AllTransactionsComponent },
    { path: 'details-transaction/', component: DetailsTransactionComponent }  
];
