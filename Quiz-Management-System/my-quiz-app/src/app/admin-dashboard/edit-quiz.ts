import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../interfaces/quiz.interface';

@Component({
  selector: 'app-edit-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-quiz.html',
  styleUrl: './edit-quiz.css'
})
export class EditQuizComponent implements OnInit {
  quizId: number | null = null;
  quiz: Quiz = {
    id: null,
    question: '',
    optA: '',
    optB: '',
    optC: '',
    optD: '',
    answer: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      this.quizId = Number(params.get('id'));
      if (this.quizId) {
        this.loadQuiz(this.quizId);
      }
    });
  }

  loadQuiz(id: number): void {
    this.quizService.getQuizById(id).subscribe({
      next: (quiz: Quiz) => {
        this.quiz = quiz;
      },
      error: (error: any) => {
        console.error('Error loading quiz:', error);
        alert('Error loading quiz: ' + (error.error || error.message));
        this.router.navigate(['/quiz-list']);
      }
    });
  }

  saveQuiz(): void {
    if (this.quiz.id === null) {
      alert('Cannot save a quiz without an ID.');
      return;
    }
    this.quizService.updateQuiz(this.quiz.id!, this.quiz).subscribe({
      next: () => {
        alert('Quiz updated successfully!');
        this.router.navigate(['/quiz-list']);
      },
      error: (error: any) => {
        console.error('Error updating quiz:', error);
        alert('Error updating quiz: ' + (error.error || error.message));
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/quiz-list']);
  }
}
