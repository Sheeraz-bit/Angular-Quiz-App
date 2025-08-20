import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { AuthService } from '../auth';
import { ResultService } from '../services/result.service'; // Import ResultService
import { Quiz } from '../interfaces/quiz.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-quiz',
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: Quiz[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: Quiz | undefined;
  answers: { [key: number]: string | null } = {};
  selectedOption: string | null = null;

  timeLeft: number = 15 * 60;
  timerSubscription: Subscription | undefined;
  userId: number | null = null;

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private resultService: ResultService,
    private router: Router,
    private ngZone: NgZone // Inject NgZone
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || currentUser.role !== 'student') {
      alert('Access denied or not logged in as a student.');
      this.router.navigate(['/login']);
      return;
    }
    this.userId = currentUser.id;

    this.loadQuestions();
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadQuestions(): void {
    this.quizService.getQuizzes().subscribe({
      next: (data) => {
        this.questions = data;
        if (this.questions.length > 0) {
          this.showQuestion(0);
        } else {
          alert('No quizzes available. Please try again later.');
          this.router.navigate(['/student-dashboard']);
        }
      },
      error: (err) => {
        console.error('Error loading quizzes:', err);
        alert('Failed to load quizzes. Please try again.');
        this.router.navigate(['/student-dashboard']);
      }
    });
  }

  showQuestion(index: number): void {
    this.currentQuestionIndex = index;
    this.currentQuestion = this.questions[index];
    this.selectedOption = this.answers[index] || null;
  }

  onOptionChange(option: string): void {
    this.answers[this.currentQuestionIndex] = option;
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.showQuestion(this.currentQuestionIndex - 1);
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.showQuestion(this.currentQuestionIndex + 1);
    }
  }

  skipQuestion(): void {
    this.answers[this.currentQuestionIndex] = null;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.showQuestion(this.currentQuestionIndex + 1);
    } else {
      alert('You have skipped the last question. You can now submit your exam.');
    }
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.ngZone.run(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.timerSubscription?.unsubscribe();
          alert('Time\'s up! Submitting your exam automatically.');
          this.submitExam();
        }
      });
    });
  }

  async submitExam(): Promise<void> {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.questions.length === 0) {
      alert('Quiz not loaded yet. Please wait or refresh.');
      return;
    }

    if (this.userId === null) {
      alert('User not logged in. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    let score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const selectedAnswer = this.answers[i];

      if (selectedAnswer) {
        let selectedLetter: string | null = null;
        if (selectedAnswer === question.optA) selectedLetter = 'A';
        else if (selectedAnswer === question.optB) selectedLetter = 'B';
        else if (selectedAnswer === question.optC) selectedLetter = 'C';
        else if (selectedAnswer === question.optD) selectedLetter = 'D';

        if (selectedLetter === question.answer) {
          score++;
        }
      }
    }

    try {
      await this.authService.updateAttemptedExam(this.userId).toPromise();

      await this.resultService.submitResult(this.userId, score).toPromise();
      
      alert(`Exam submitted! Your score is: ${score} out of ${this.questions.length}`);
      this.router.navigate(['/result']);
      
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Failed to submit exam. Please try again.');
    }
  }
}
