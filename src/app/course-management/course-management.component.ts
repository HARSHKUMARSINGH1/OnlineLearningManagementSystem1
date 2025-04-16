import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { ICourse } from 'src/app/models/course-model';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

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
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
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
    );
  }

  onCourseSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const courseId = Number(selectElement.value);
    this.selectedCourse = this.courses.find(course => course.courseID === courseId) || null;
  }

  navigateToUpdateCourse(course: ICourse): void {
    this.router.navigate(['/update-course', course.courseID]).then(() => {
      this.snackBar.open('Navigated to update course successfully', 'Close', {
        duration: 3000,
        verticalPosition: 'top' // Set position to top
      });
    });
  }

  navigateToListAllQuiz(): void {
    this.router.navigate(['/list-all-quiz']);
  }
  
  enrollInCourse(): void {
    if (this.selectedCourse) {
      this.courseService.enrollInCourse(this.selectedCourse.courseID).subscribe(
        (response) => {
          this.snackBar.open('Enrolled in course successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top' // Set position to top
          });
        },
        (error) => {
          this.snackBar.open('Failed to enroll in course. Please try again later.', 'Close', {
            duration: 3000,
            verticalPosition: 'top' // Set position to top
          });
        }
      );
    }
  }

  confirmDelete(course: ICourse): void {
    const snackBarRef = this.snackBar.open(`Do you want to delete ${course.title}?`, 'Confirm', {
      duration: 5000,
      verticalPosition: 'top' // Set position to top
    });

    snackBarRef.onAction().subscribe(() => {
      this.deleteCourse(course.courseID);
    });
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        this.courses = this.courses.filter(course => course.courseID !== courseId);
        this.snackBar.open('Course deleted successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top' // Set position to top
        });
      },
      (error) => {
        this.snackBar.open('Failed to delete course. Please try again later.', 'Close', {
          duration: 3000,
          verticalPosition: 'top' // Set position to top
        });
      }
    );
  }
}
