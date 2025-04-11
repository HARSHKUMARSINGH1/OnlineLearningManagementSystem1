import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { AddCourse } from 'src/app/models/add-course.model';

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

  constructor(private courseService: CourseManagementService, private router: Router) {}

  onSubmit(): void {
    console.log('Submitting course:', this.addCourse); // Debugging statement
    this.courseService.addCourse(this.addCourse).subscribe(
      (response) => {
        console.log('Course added successfully', response);
        this.router.navigate(['/course-management']); // Navigate back to course management page
      },
      (error) => {
        console.error('Error adding course', error);
      }
    );
  }
}