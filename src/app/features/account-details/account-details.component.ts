import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../../core/services/accounts.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  imports: [CommonModule],
})
export class AccountDetailsComponent implements OnInit {
  accountDetails: Account | null = null;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router

  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.accountService.getAccountById(accountId).subscribe((data) => {
        this.accountDetails = data;
      });
    }
  }
  goBack(): void {
    if (this.accountDetails) {
      // Sauvegarde l'ID du compte dans localStorage
      localStorage.setItem('selectedAccountId', this.accountDetails.id);
    }
    // Redirige vers la page d'accueil
    this.router.navigate(['/']);
  }
  
}
