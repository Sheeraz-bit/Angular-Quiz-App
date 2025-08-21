import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../interfaces/quiz.interface';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.css'
})
export class QuizListComponent implements OnInit {
  allQuizzes: Quiz[] = [];
  filteredQuizzes: Quiz[] = [];
  currentPage: number = 1;
  pageSize: number = 25;
  searchTerm: string = '';
  statsText: string = 'Loading...';
  totalPages: number = 0;
  startPage: number = 1;
  endPage: number = 1;

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadQuizQuestions();
  }

  loadQuizQuestions(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (quizzes: Quiz[]) => {
        this.allQuizzes = quizzes;
        this.filterQuizzes();
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading quiz questions:', error);
        this.statsText = 'Error loading quiz questions.';
        this.cdr.detectChanges();
      }
    });
  }

  filterQuizzes(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredQuizzes = this.allQuizzes.filter(quiz =>
      quiz.question.toLowerCase().includes(searchTermLower) ||
      quiz.optA.toLowerCase().includes(searchTermLower) ||
      quiz.optB.toLowerCase().includes(searchTermLower) ||
      quiz.optC.toLowerCase().includes(searchTermLower) ||
      quiz.optD.toLowerCase().includes(searchTermLower) ||
      quiz.answer.toLowerCase().includes(searchTermLower)
    );
    this.currentPage = 1;
    this.updatePagination();
    this.updateStatsText();
    this.cdr.detectChanges();
  }

  changePageSize(): void {
    this.currentPage = 1;
    this.updatePagination();
    this.updateStatsText();
    this.cdr.detectChanges();
  }

  getCurrentPageQuizzes(): Quiz[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredQuizzes.slice(startIndex, endIndex);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredQuizzes.length / this.pageSize);
    this.startPage = Math.max(1, this.currentPage - 2);
    this.endPage = Math.min(this.totalPages, this.currentPage + 2);
  }

  getPageNumbers(): number[] {
    const pages = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateStatsText();
      this.cdr.detectChanges();
    }
  }

  updateStatsText(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const total = this.filteredQuizzes.length;
    if (total === 0) {
      this.statsText = '0 questions found';
    } else {
      this.statsText = `Showing ${startIndex + 1}-${Math.min(endIndex, total)} of ${total} questions`;
    }
  }

  addQuiz(): void {
    this.router.navigate(['/add-quiz']);
  }

  editQuiz(id: number): void {
    this.router.navigate(['/edit-quiz', id]);
  }

  deleteQuiz(id: number): void {
    if (confirm('Are you sure you want to delete this quiz question?')) {
      this.quizService.deleteQuiz(id).subscribe({
        next: () => {
          alert('Quiz question deleted successfully!');
          this.loadQuizQuestions();
        },
        error: (error: any) => {
          console.error('Error deleting quiz:', error);
          alert('Error deleting quiz question.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}
