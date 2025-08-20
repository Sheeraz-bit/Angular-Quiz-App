import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard';
import { QuizComponent } from './quiz/quiz';
import { ResultComponent } from './result/result';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '/login' } // Wildcard route for any other invalid paths
];
