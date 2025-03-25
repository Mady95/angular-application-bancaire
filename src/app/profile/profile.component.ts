import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {RouterLink} from '@angular/router';

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

  constructor(private authService: AuthService) {}

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

      setTimeout(() => {
        this.copied = false;
      }, 3000);
    });
  }


}
