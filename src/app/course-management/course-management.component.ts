import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { ICourse } from 'src/app/models/course-model';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  userType: string = 'Instructor'; // Change to 'Student' for student dashboard
  courses: ICourse[] = [];
  selectedCourse: ICourse | null = null;
  errorMessage: string = '';

  constructor(private courseService: CourseManagementService, private router: Router) {}

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
