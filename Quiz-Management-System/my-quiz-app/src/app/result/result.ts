import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { ResultService } from '../services/result.service';
import { Result } from '../interfaces/result.interface';
import { CommonModule } from '@angular/common'; // For NgIf and other common directives

@Component({
  selector: 'app-result',
  imports: [CommonModule], // Add CommonModule for directives like NgIf
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent implements OnInit {
  scoreDisplay: string = 'Loading...';
  resultMessage: string = '';
  scoreColor: string = '';

  constructor(
    private authService: AuthService,
    private resultService: ResultService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (currentUser.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return;
    }

    this.loadResults(currentUser.id);
  }

  loadResults(userId: number): void {
    this.resultService.getResultsByUserId(userId).subscribe({
      next: (results) => {
        console.log('Received results:', results);
        if (results && results.length > 0) {
          const latestResult = results[0]; // Assuming latest result is the first one
          console.log('Latest result:', latestResult);
          this.displayResult(latestResult);
        } else {
          this.scoreDisplay = 'No results found';
          this.resultMessage = 'You haven\'t taken any exams yet.';
          this.scoreColor = '#333';
        }
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (error) => {
        console.error('Failed to fetch results:', error);
        this.scoreDisplay = 'Error';
        this.resultMessage = 'Failed to load results.';
        this.scoreColor = 'red';
        this.cdr.detectChanges(); // Manually trigger change detection for error state
      }
    });
  }

  displayResult(result: Result): void {
    this.scoreDisplay = `${result.score}/10`;

    const percentage = (result.score / 10) * 100;
    if (percentage >= 80) {
      this.resultMessage = 'Excellent! You passed with flying colors!';
      this.scoreColor = '#28a745'; // Green
    } else if (percentage >= 60) {
      this.resultMessage = 'Good job! You passed the exam.';
      this.scoreColor = '#007bff'; // Blue
    } else {
      this.resultMessage = 'Keep studying! You can do better next time.';
      this.scoreColor = '#dc3545'; // Red
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
