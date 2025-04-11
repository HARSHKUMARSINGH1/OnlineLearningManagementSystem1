import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../models/course-model'; // Ensure this path is correct
import { AddCourse } from 'src/app/models/add-course.model';
import { UpdateCourse } from 'src/app/models/update-course.model'; 
@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {
  private getAllCourseUrl = 'https://localhost:7256/api/CourseManagement'; // API URL to get all courses
  private addCourseUrl = 'https://localhost:7256/api/CourseManagement'; // API URL for adding a course
  private enrollCourseUrl = 'https://localhost:7256/api/CourseManagement/enroll'; // API URL for enrolling in a course
  private updatecourseUrl = 'https://localhost:7256/api/CourseManagement';
  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.getAllCourseUrl);
  }

  getCourseById(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.getAllCourseUrl}/${id}`);
  }

  addCourse(addCourse: AddCourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.addCourseUrl, addCourse);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getAllCourseUrl}/${id}`);
  }

  
updateCourse(courseId: number, course: UpdateCourse): Observable<any> {
      return this.http.put(`${this.updatecourseUrl}/${courseId}`, course);
    }
  

  enrollInCourse(courseId: number): Observable<any> {
    return this.http.post(`${this.enrollCourseUrl}/${courseId}`, {});
  }
}
