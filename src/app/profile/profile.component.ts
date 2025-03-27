import { Component } from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {ToastService} from "../core/services/toast.service";

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  name = '';
  clientCode = '';
  initials = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.name = user.name;
      this.clientCode = user.clientCode;
      this.initials = this.getInitials(user.name);
    });
  }

  getInitials(name: string): string {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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
