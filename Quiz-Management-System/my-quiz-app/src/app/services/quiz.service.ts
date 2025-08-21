import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8082/api/quiz';

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/start`);
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/all`);
  }

  addQuiz(quiz: Quiz): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, quiz, { responseType: 'text' });
  }

  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  updateQuiz(id: number, quiz: Quiz): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, quiz, { responseType: 'text' });
  }
}
