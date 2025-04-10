import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7256/api/UserAuth';
  private apiUrl2 = 'https://localhost:7256/api/User';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, user, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  validateToken(): Observable<{ isValid: boolean }> {
    const token = localStorage.getItem('jwtToken');
    console.log('Sending token for validation:', token); // Debugging log
    return this.http.post<{ isValid: boolean }>(`${this.apiUrl}/validate-token`, { token }).pipe(
      catchError(this.handleError)
    );
  }
  

  getUserProfile(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl2}/auth/${userId}`);
      }

  

    updateProfile(profileData: any): Observable<any> {
          return this.http.put(this.apiUrl2, profileData, { responseType: 'text' }).pipe(
            catchError(this.handleError)
          );
        }
      


  
    
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server-side error: ${error.status}, body: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}