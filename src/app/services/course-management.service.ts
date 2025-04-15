import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../models/course-model'; // Ensure this path is correct
import { AddCourse } from 'src/app/models/add-course.model';
import { UpdateCourse } from 'src/app/models/update-course.model'; 

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {
  private apiUrl = 'https://localhost:7256/api/CourseManagement'; // Ensure this matches your backend URL

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.apiUrl}/${id}`);
  }

  addCourse(addCourse: AddCourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.apiUrl, addCourse);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCourse(courseId: number, course: UpdateCourse): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, course);
  }
}
