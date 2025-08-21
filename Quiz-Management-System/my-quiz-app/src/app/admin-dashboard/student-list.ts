import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit {
  students: User[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadStudents();
  }

  loadStudents(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.students = users.filter(user => user.role === 'student');
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading students:', error);
        // Optionally display an error message to the user
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}
