import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailsTransactionComponent } from "./details-transaction/details-transaction.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-application-bancaire';
}