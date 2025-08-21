import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard';
import { QuizComponent } from './quiz/quiz';
import { ResultComponent } from './result/result';
import { QuizListComponent } from './admin-dashboard/quiz-list';
import { StudentListComponent } from './admin-dashboard/student-list';
import { ResultListComponent } from './admin-dashboard/result-list';
import { AddQuizComponent } from './admin-dashboard/add-quiz';
import { EditQuizComponent } from './admin-dashboard/edit-quiz';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'result-list', component: ResultListComponent },
  { path: 'add-quiz', component: AddQuizComponent },
  { path: 'edit-quiz/:id', component: EditQuizComponent },
  { path: '**', redirectTo: '/login' } // Wildcard route for any other invalid paths
];
