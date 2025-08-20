import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { User } from '../user';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  adminName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || currentUser.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      this.router.navigate(['/login']);
      return;
    }
    this.adminName = currentUser.username;
  }

  navigateTo(page: string): void {
    switch(page) {
      case 'quiz-list':
        this.router.navigate(['/quiz-list']); // Assuming you'll create this route later
        break;
      case 'student-list':
        this.router.navigate(['/student-list']); // Assuming you'll create this route later
        break;
      case 'result-list':
        this.router.navigate(['/result-list']); // Assuming you'll create this route later
        break;
      case 'add-quiz':
        this.router.navigate(['/add-quiz']); // Assuming you'll create this route later
        break;
      default:
        alert('Page not implemented yet');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
