import { Routes } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';

export const routes: Routes = [
    { path : '', component: TransactionComponent },
    { path: 'transaction/:id', component: TransactionComponent },
    { path: 'details-transaction/:id', component: DetailsTransactionComponent },
    { path: 'accounts/:id/transactions', component: AllTransactionsComponent },
     
];
