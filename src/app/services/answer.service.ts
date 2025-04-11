import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer'; // Ensure you have created the Answer model
import { ListAllQuiz } from '../models/list-all-quiz'; // Ensure you have created the Quiz model

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'https://localhost:7256/api/Answer/GetAllAnswers'; // Answer-related endpoints
  private quizApiUrl = 'https://localhost:7256/api/QuizAndAssessment/GetAllQuizzes'; // Quiz-related endpoints

  constructor(private http: HttpClient) {}

  // Fetch all answers (Instructor functionality)
  getAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}`);
  }

  // Fetch an answer by ID (Instructor functionality)
  getAnswerById(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.apiUrl}/${id}`);
  }

  // Add a new answer (Instructor functionality)
  addAnswer(answer: Answer): Observable<any> {
    return this.http.post(`${this.apiUrl}`, answer);
  }

  // Update an existing answer (Instructor functionality)
  updateAnswer(id: number, answer: Answer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, answer);
  }

  // Delete an answer (Instructor functionality)
  deleteAnswer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Fetch all quizzes (Student functionality)
  getAllQuizzes(): Observable<ListAllQuiz[]> {
    return this.http.get<ListAllQuiz[]>(`${this.quizApiUrl}`);
  }

  // Submit student answers (Student functionality)
  submitAnswers(answers: Answer[]): Observable<any> {
    return this.http.post(`${this.apiUrl}`, answers);
  }
}
