import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackStudentService {
  // Base API URL for progress tracking and reports
  private readonly getbyuserID = 'https://localhost:7256/api/ProgressTrackingandReports';

  constructor(private http: HttpClient) { }

  // Fetch all progress data
  getAllProgress(): Observable<any> {
    return this.http.get(this.getbyuserID);
  }

  // Fetch progress data by userId dynamically
  getProgressByUserId(userId: number): Observable<any> {
    // Constructs: https://localhost:7256/api/ProgressTrackingandReports/{userId}
    const url = `${this.getbyuserID}/${userId}`;
    return this.http.get(url);
  }

  // Update progress for a user dynamically
  updateProgress(userId: number, progressDto: any): Observable<any> {
    // Constructs: https://localhost:7256/api/ProgressTrackingandReports/{userId}
    const url = `${this.getbyuserID}/${userId}`;
    return this.http.put(url, progressDto);
  }
}
