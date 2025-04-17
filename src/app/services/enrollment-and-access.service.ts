import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrollmentDto } from 'src/app/models/enrollment.dto';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentAndAccessService {
  private apiUrl = 'https://localhost:7256/api/Enrollment'; // Ensure this matches your backend URL

  constructor(private http: HttpClient) {}

  getEnrollmentsByUserId(userId: number): Observable<EnrollmentDto[]> {
    return this.http.get<EnrollmentDto[]>(`${this.apiUrl}/user/${userId}`);
  }

  addEnrollment(enrollmentDto: EnrollmentDto): Observable<EnrollmentDto> {
    return this.http.post<EnrollmentDto>(this.apiUrl, enrollmentDto);
  }

  enroll(userId: string, courseId: string): Observable<any> {
    return this.http.post(this.apiUrl, { userId, courseId });
  }

  enrollInCourse(courseID: number): Observable<any> {
    return this.http.post(this.apiUrl, { courseID });
  }

  

    progressData: any[] = []; 
  isUserEnrolled(courseId: number, userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isEnrolled/${courseId}/${userId}`);
  }
}
