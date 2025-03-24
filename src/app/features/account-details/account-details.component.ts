import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountsService } from '../../core/services/accounts.service';

@Component({
  selector: 'app-account-details',
  standalone: true,
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  imports: [CommonModule],
})
export class AccountDetailsComponent implements OnInit {
  accountDetails: any = null;

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.fetchAccountDetails(accountId);
    }
  }

  fetchAccountDetails(accountId: string): void {
    this.accountsService.getAccountDetails(accountId).subscribe({
      next: (data) => (this.accountDetails = data),
      error: (err) => console.error('Erreur lors de la récupération des détails du compte', err)
    });
  }
}
