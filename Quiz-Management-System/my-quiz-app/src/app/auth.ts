import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs'; // Import throwError
import { catchError, map } from 'rxjs/operators';
import { User } from './user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private apiUrl = 'http://localhost:8082/api/user';
  private isBrowser: boolean;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    let storedUser = null;
    if (this.isBrowser) {
      storedUser = localStorage.getItem('loggedInUser');
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(user => {
          if (user && user.id) {
            if (this.isBrowser) {
              localStorage.setItem('loggedInUser', JSON.stringify(user));
            }
            this.currentUserSubject.next(user);
            return user;
          }
          return null;
        }),
        catchError(error => {
          console.error('Login failed:', error);
          // Return an Observable of null to indicate login failure without breaking the stream
          return of(null);
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('loggedInUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isStudent(): boolean {
    return this.currentUserSubject.value?.role === 'student';
  }

  hasAttemptedExam(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/attempted/${userId}`).pipe(
      catchError(error => {
        console.error('Error checking exam attempt status:', error);
        return of(false); // Return false on error
      })
    );
  }

  updateAttemptedExam(userId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/attempted/${userId}`, {}).pipe(
      catchError(error => {
        console.error('Error updating exam attempt status:', error);
        return throwError(() => new Error('Failed to update exam attempt status')); // Re-throw the error
      })
    );
  }

  signup(username: string, email: string, password: string, role: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, { username, email, password, role }).pipe(
      catchError(error => {
        console.error('Signup failed:', error);
        let errorMessage = 'An unknown error occurred. Please try again.';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Backend message from RuntimeException
        } else if (error.message) {
          errorMessage = error.message; // Generic HTTP error message
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
