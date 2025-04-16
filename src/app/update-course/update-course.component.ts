import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { UpdateCourse } from 'src/app/models/update-course.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  course: UpdateCourse = {
    title: '',
    description: '',
    syllabus: '',
    preRequisites: '',
    instructorID: 0
  };
  courseId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseManagementService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.courseId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.courseService.getCourseById(this.courseId).subscribe(
      (data: UpdateCourse) => {
        this.course = data;
      },
      (error) => {
        console.error('Failed to load course details', error);
        this.snackBar.open('Failed to load course details', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  onSubmit(): void {
    this.courseService.updateCourse(this.courseId, this.course).subscribe(
      (response) => {
        this.snackBar.open('Course updated successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/course-management']);
      },
      (error) => {
        console.error('Failed to update course', error);
        this.snackBar.open('Failed to update course. Please try again later.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/course-management']);
  }
}
