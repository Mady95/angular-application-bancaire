import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Account, AccountService } from '../../core/services/accounts.service';
import {ToastService} from '../../core/services/toast.service';

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
    private router: Router,
    private toastService: ToastService

  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.accountService.getAccountById(accountId).subscribe((data) => {
        this.accountDetails = data;

        console.log('Account Details:', this.accountDetails);
        if (this.accountDetails && this.accountDetails.openAt ) {
          this.accountDetails.openAt  = new Date(this.accountDetails.openAt );
        }
      });
    }
  }



  goBack(): void {
    if (this.accountDetails) {
      localStorage.setItem('selectedAccountId', this.accountDetails.id);
    }
    this.router.navigate(['/']);
  }

  copied = false;

  copy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.copied = true;

      this.toastService.show('📋 Code client copié !', 'info');

      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }

}
