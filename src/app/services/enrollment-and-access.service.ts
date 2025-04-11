import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrollmentDto } from 'src/app/models/enrollment.dto';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentAndAccessService {
  private apiUrl = 'https://localhost:7256/api/Enrollment';

  constructor(private http: HttpClient) {}

  // Existing methods
  // getAllEnrollments(): Observable<EnrollmentDto[]> {
  //   return this.http.get<EnrollmentDto[]>();
  // }

  getEnrollmentsByUserId(userId: number): Observable<EnrollmentDto[]> {
    return this.http.get<EnrollmentDto[]>(`${this.apiUrl}/user/${userId}`);
  }

  addEnrollment(enrollmentDto: EnrollmentDto): Observable<EnrollmentDto> {
    return this.http.post<EnrollmentDto>(this.apiUrl, enrollmentDto);
  }

  // deleteEnrollment(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }

  // New method for enrolling a user in a specific course
  enroll(userId: string, courseId: string): Observable<any> {
    return this.http.post(this.apiUrl, { userId, courseId });
  }
}
