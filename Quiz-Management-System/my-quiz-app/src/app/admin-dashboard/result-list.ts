import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { ResultService } from '../services/result.service';
import { Result } from '../interfaces/result.interface';

@Component({
  selector: 'app-result-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './result-list.html',
  styleUrl: './result-list.css'
})
export class ResultListComponent implements OnInit {
  results: Result[] = [];

  constructor(
    private authService: AuthService,
    private resultService: ResultService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadResults();
  }

  loadResults(): void {
    console.log('Loading all results for admin...');
    this.resultService.getAllResults().subscribe({
      next: (results: Result[]) => {
        console.log('Received results:', results);
        this.results = results;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading results:', error);
        // Optionally display an error message to the user
      }
    });
  }

  getScoreClass(score: number): string {
    const percentage = (score / 10) * 100;
    if (percentage >= 80) {
      return 'score-high';
    } else if (percentage >= 60) {
      return 'score-medium';
    } else {
      return 'score-low';
    }
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}
