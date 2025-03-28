import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Assure-toi d'importer le AuthService
import { DetailsTransactionComponent } from "./details-transaction/details-transaction.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { NavbarComponent } from "./navbar/navbar.component";
import {ToastComponent} from './features/toast/toast.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-application-bancaire';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    
  }
  
  
}
