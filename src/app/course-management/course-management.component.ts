import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { AuthService } from 'src/app/services/auth.service'; 
import { EnrollmentAndAccessService } from 'src/app/services/enrollment-and-access.service';
import { ICourse } from 'src/app/models/course-model';
import { jwtDecode } from 'jwt-decode'; 
import { EnrollmentDto } from '../models/enrollment.dto';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  userType: string = ''; 
  userId: number = 0
  courses: ICourse[] = [];
  selectedCourse: ICourse | null = null;
  errorMessage: string = '';

  constructor(
    private courseService: CourseManagementService,
    private authService: AuthService, 
    private router: Router,
    private enrollmentService: EnrollmentAndAccessService,
  ) {}

  ngOnInit(): void {
    this.getUserProfile(); 
    this.courseService.getAllCourses().subscribe(
      (data: ICourse[]) => {
        this.courses = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load courses. Please try again later.';
      }
    );
  }

  fetchAuthId(): string {
    const token = localStorage.getItem('jwtToken');
    let authId = '';
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        authId = decodedToken.sub; 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return authId;
  }

  getUserProfile(): void {
    const authId = this.fetchAuthId();
    this.authService.getUserProfile(authId).subscribe(
      (data: any) => {
        this.userType = data.role; 
        this.userId=data.userId;
        console.log('userType:', this.userType);
        console.log('userId',this.userId)
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  onCourseSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const courseId = Number(selectElement.value);
    this.selectedCourse = this.courses.find(course => course.courseID === courseId) || null;
  }

  navigateToUpdateCourse(course: ICourse): void {
    this.router.navigate(['/update-course', course.courseID]);
  }

  
  addEnrollment(course: ICourse) {
    if (this.userId === 0) {
      console.error('User ID is not set.');
      return;
    }
  
    if (course) {
      const enrollment: EnrollmentDto = {
        enrollmentID: 0, // Assuming 0 for new enrollment, adjust as needed
        courseID: course.courseID,
        title: course.title,
        userID: this.userId, // Ensure this.userId is correctly set
        enrollmentDate: new Date() // Ensure date is in ISO format
      };
  
      this.enrollmentService.addEnrollment(enrollment).subscribe(
        (response) => {
          console.log('Enrollment added successfully:', response);
        },
        (error) => {
          console.error('Error adding enrollment:', error);
        }
      );
    } else {
      console.error('No course selected for enrollment.');
    }
  }
  
  
  


  

  confirmDelete(course: ICourse): void {
    if (confirm(`Do you want to delete ${course.title}?`)) {
      this.deleteCourse(course.courseID);
    }
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        this.courses = this.courses.filter(course => course.courseID !== courseId);
        alert('Course deleted successfully');
      },
      (error: any) => {
        alert('Failed to delete course. Please try again later.');
      }
    );
  }
}
