import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  adminName: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.adminName = currentUser.username;
    }
  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
