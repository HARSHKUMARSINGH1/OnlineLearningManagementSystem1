import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer'; // Ensure you have created the Answer model
import { ListAllQuiz } from '../models/list-all-quiz'; // Ensure you have created the Quiz model

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  // Base API URLs
  private baseUrl = 'https://localhost:7256/api';
  private answerApiUrl = `${this.baseUrl}/Answer`; // Answer-related endpoints
  private quizApiUrl = `${this.baseUrl}/QuizAndAssessment`; // Quiz-related endpoints
  constructor(private http: HttpClient) {}

  /**
   * Fetch all answers (Instructor functionality)
   * Endpoint: /api/Answer/GetAllAnswers
   */
  getAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.answerApiUrl}/GetAllAnswers`);
  }

  /**
   * Fetch an answer by ID (Instructor functionality)
   * Endpoint: /api/Answer/GetAnswerById/{id}
   */
  getAnswerById(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.answerApiUrl}/GetAnswerById/${id}`);
  }

  /**
   * Update an existing answer (Instructor functionality)
   * Endpoint: /api/Answer/UpdateAnswer/{id}
   */
  updateAnswer(id: number, answer: Partial<Answer>): Observable<any> {
    return this.http.put(`${this.answerApiUrl}/UpdateAnswer/${id}`, answer);
  }

  /**
   * Delete an answer (Instructor functionality)
   * Endpoint: /api/Answer/DeleteAnswer/{id}
   */
  deleteAnswer(id: number): Observable<any> {
    return this.http.delete(`${this.answerApiUrl}/DeleteAnswer/${id}`);
  }

  /**
   * Fetch all quizzes (Student functionality)
   * Endpoint: /api/QuizAndAssessment/GetAllQuizzes
   */
  getAllQuizzes(): Observable<ListAllQuiz[]> {
    return this.http.get<ListAllQuiz[]>(`${this.quizApiUrl}/GetAllQuizzes`);
  }

  /**
   * Submit student answers (Student functionality)
   * Endpoint: /api/Answer/AddAnswer
   */
  submitAnswers(answer: Answer): Observable<any> {
    return this.http.post(`${this.answerApiUrl}/AddAnswer`, answer);
  } 
}
