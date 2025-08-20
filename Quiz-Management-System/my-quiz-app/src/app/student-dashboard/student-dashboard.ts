import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { User } from '../user';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboardComponent implements OnInit {
  studentName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || currentUser.role !== 'student') {
      alert('Access denied. Student privileges required.');
      this.router.navigate(['/login']);
      return;
    }
    this.studentName = currentUser.username;

    // Check if user has already attempted the exam
    this.authService.hasAttemptedExam(currentUser.id).subscribe(attempted => {
      if (attempted) {
        alert('You have already attempted the exam. Redirecting to results page.');
        this.router.navigate(['/result']);
      }
    });
  }

  startExam(): void {
    if (confirm('Are you sure you want to start the exam? You cannot retake it once submitted.')) {
      this.router.navigate(['/quiz']);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
