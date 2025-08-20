import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { AuthService } from '../auth'; // Import the AuthService
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          if (user.role === 'student') {
            this.authService.hasAttemptedExam(user.id).subscribe(attempted => {
              if (attempted) {
                alert('You have already attempted the exam. Redirecting to results page.');
                this.router.navigate(['/result']);
              } else {
                this.router.navigate(['/student-dashboard']);
              }
            });
          } else if (user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.errorMessage = 'Invalid user role!';
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}
