import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../interfaces/result.interface'; // Import the Result interface

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:8082/api/results';

  constructor(private http: HttpClient) {}

  submitResult(userId: number, score: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, { userId, score }, { responseType: 'text' });
  }

  getResultsByUserId(userId: number): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/user/${userId}`);
  }
}
