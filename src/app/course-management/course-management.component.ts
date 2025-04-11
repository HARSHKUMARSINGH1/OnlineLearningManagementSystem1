import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { EnrollmentAndAccessService } from 'src/app/services/enrollment-and-access.service';
import { ICourse } from 'src/app/models/course-model';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  userType: string = 'Student'; // Change to 'Student' for student dashboard
  courses: ICourse[] = [];
  selectedCourse: ICourse | null = null;
  errorMessage: string = '';
  userId: string = 'logged-in-user-id'; // Replace with actual logged-in user ID

  constructor(
    private courseService: CourseManagementService,
    private enrollmentService: EnrollmentAndAccessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      (data: ICourse[]) => {
        this.courses = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load courses. Please try again later.';
      }
    );
  }

  onCourseSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const courseId = Number(selectElement.value);
    this.selectedCourse = this.courses.find(course => course.courseID === courseId) || null;
  }

  navigateToAddCourse(): void {
    this.router.navigate(['/add-course']);
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