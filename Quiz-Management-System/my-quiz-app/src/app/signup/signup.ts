import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule
import { AuthService } from '../auth'; // Import the AuthService
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  signupMessage: string = '';
  messageColor: string = '';

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  signup(): void {
    this.signupMessage = '';
    this.messageColor = '';

    this.authService.signup(this.username, this.email, this.password, this.role).subscribe({
      next: (user) => {
        this.signupMessage = 'Signup successful! You can now login.';
        this.messageColor = 'green';
        this.cdr.detectChanges(); // Manually trigger change detection
        // Optionally redirect to login page after successful signup
        // this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.signupMessage = error.message || 'Signup failed! Something went wrong.';
        this.messageColor = 'red';
        this.cdr.detectChanges(); // Manually trigger change detection for error state
      }
    });
  }
}
