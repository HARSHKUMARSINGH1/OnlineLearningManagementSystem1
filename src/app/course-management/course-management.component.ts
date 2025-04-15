import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { EnrollmentAndAccessService } from 'src/app/services/enrollment-and-access.service';
import { ICourse } from 'src/app/models/course-model';
import { jwtDecode } from 'jwt-decode'; // Correct import
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  userType: string = ''; // Initialize as empty
  userType: string = 'Student'; // Change to 'Student' for student dashboard
  courses: ICourse[] = [];
  selectedCourse: ICourse | null = null;
  errorMessage: string = '';
  userId: string = 'logged-in-user-id'; // Replace with actual logged-in user ID

  constructor(
    private courseService: CourseManagementService,
    private authService: AuthService, // Inject AuthService
    private router: Router
  ) {}
  constructor(
    private courseService: CourseManagementService,
    private enrollmentService: EnrollmentAndAccessService,
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

  navigateToUpdateCourse(course: ICourse): void {
    this.router.navigate(['/update-course', course.courseID]);
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
      (error) => {
        alert('Failed to delete course. Please try again later.');
      }
    );
  }
}


  enrollInCourse(courseId: number | undefined): void {
    if (courseId !== undefined) {
      this.enrollmentService.enroll(this.userId, courseId.toString()).subscribe(
        response => {
          alert('Successfully enrolled in course');
        },
        error => {
          console.error('Error enrolling in course:', error);
          alert('Failed to enroll in course');
        }
      );
    } else {
      alert('Course ID is undefined');
    }
  }

  // Added method for navigation to enrollment page
  navigateToEnrollment(courseID: string) {
    this.router.navigate(['/enrollment-and-access'], { queryParams: { courseID: courseID } });
  }
}