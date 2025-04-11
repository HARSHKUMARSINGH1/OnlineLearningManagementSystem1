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
  private getAllCourseUrl = 'https://localhost:7256/api/CourseManagement'; // API URL to get all course
  private addCourseUrl = 'https://localhost:7256/api/CourseManagement'; // New API URL for adding a course

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.getAllCourseUrl);
  }

  getCourseById(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.getAllCourseUrl}/${id}`);
  }

  addCourse(addCourse: AddCourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.addCourseUrl, addCourse); // Use the new API URL
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getAllCourseUrl}/${id}`);
  }

  updateCourse(id: number, updateCourse: UpdateCourse): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.getAllCourseUrl}/${id}`, updateCourse);
  }
}