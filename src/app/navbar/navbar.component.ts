import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit , ViewChild } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone : true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  initials: string = '';

  @ViewChild('menuRef') menuRef!: ElementRef;

  constructor(private authService: AuthService, private router: Router,private eRef: ElementRef) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.initials = this.getInitials(user.name);
        this.isLoggedIn = true;
      },
      error: () => {
        this.isLoggedIn = false;
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    localStorage.removeItem("jwt")
    localStorage.removeItem("selectedAccount")
    this.router.navigate(['/login']);
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.initials = this.getInitials(user.name);
        this.isLoggedIn = true;
      },
      error: () => {
        this.isLoggedIn = false;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    setTimeout(() => {
      if (!this.menuRef?.nativeElement.contains(event.target)) {
        this.menuOpen = false;
      }
    });
  }


  closeMenu() {
    this.menuOpen = false;
  }

}
