import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ListAllQuiz } from 'src/app/models/list-all-quiz';
import { catchError } from 'rxjs/operators'; // Import the catchError operator

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // Base URL for the API
  private baseUrl = 'https://localhost:7256/api/QuizAndAssessment';

  constructor(private http: HttpClient) {}

  // Get all quizzes
  getAllQuizzes(): Observable<ListAllQuiz[]> {
    return this.http.get<ListAllQuiz[]>(`${this.baseUrl}/GetAllQuizzes`).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Get a quiz by ID
  getQuizById(id: number): Observable<ListAllQuiz> {
    return this.http.get<ListAllQuiz>(`${this.baseUrl}/GetQuizById/${id}`).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Add a new quiz
  addQuiz(quiz: ListAllQuiz): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddQuiz`, quiz).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Update an existing quiz
  updateQuiz(id: number, quiz: ListAllQuiz): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateQuiz/${id}`, quiz).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Delete a quiz
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteQuiz/${id}`).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  // Generic error handler
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log the error for debugging
    let errorMessage = 'Something went wrong. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Return the error to the caller
    return throwError(() => new Error(errorMessage));
  }
}
