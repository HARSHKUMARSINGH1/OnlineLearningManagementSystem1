import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { AddCourse } from 'src/app/models/add-course.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  addCourse: AddCourse = {
    title: '',
    description: '',
    syllabus: '',
    instructorID: 0,
    preRequisites: ''
  };

  constructor(
    private courseService: CourseManagementService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  onSubmit(): void {
    console.log('Submitting course:', this.addCourse); // Debugging statement
    this.courseService.addCourse(this.addCourse).subscribe(
      (response) => {
        this.snackBar.open('Course Added Successfully', 'Close', {
          duration: 3000,
        });
        console.log('Course added successfully', response);
        this.router.navigate(['/course-management']); // Navigate back to course management page
        this.addCourse.title = ""; // Clear form fields after submission
        this.addCourse.instructorID = 0;
        this.addCourse.syllabus = "";
        this.addCourse.description = "";
        this.addCourse.preRequisites = "";
      },
      (error) => {
        this.snackBar.open('Error adding course', 'Close', {
          duration: 3000,
        });
        console.error('Error adding course', error);
      }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/course-management']);
  }
}
