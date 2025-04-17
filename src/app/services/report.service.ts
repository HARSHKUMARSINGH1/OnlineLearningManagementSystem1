import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // Replace with your actual backend API endpoint
  private apiUrl = 'https://localhost:7256/api/ProgressTrackingandReports';  

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  updateReport(report: Report): Observable<Report> {
    const url = `${this.apiUrl}/${report.progressID}`; // Assuming API uses progressID to identify records
    return this.http.put<Report>(url, report); // HTTP PUT method for updates
  }
  
}
