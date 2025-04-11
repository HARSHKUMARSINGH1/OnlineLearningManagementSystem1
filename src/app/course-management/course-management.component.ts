import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { ICourse } from 'src/app/models/course-model';
import { jwtDecode } from 'jwt-decode'; // Correct import
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  userType: string = ''; // Initialize as empty
  courses: ICourse[] = [];
  selectedCourse: ICourse | null = null;
  errorMessage: string = '';

  constructor(
    private courseService: CourseManagementService,
    private authService: AuthService, // Inject AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile(); // Fetch user profile on initialization
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
        authId = decodedToken.sub; // Adjust this based on your token structure
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
        this.userType = data.role; // Set userType based on profile data
        console.log('userType:', this.userType);
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
       // Debugging log
    );
  }

  onCourseSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const courseId = Number(selectElement.value);
    this.selectedCourse = this.courses.find(course => course.courseID === courseId) || null;
  }

  enrollInCourse(): void {
    if (this.selectedCourse) {
      this.courseService.enrollInCourse(this.selectedCourse.courseID).subscribe(
        (response) => {
          alert('Enrolled in course successfully');
        },
        (error) => {
          alert('Failed to enroll in course. Please try again later.');
        }
      );
    }
  }

  
  
  deleteCourse(): void {
    // Logic to be implemented later
  }
}
