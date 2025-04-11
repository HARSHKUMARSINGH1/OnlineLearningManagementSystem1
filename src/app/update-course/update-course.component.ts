import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { UpdateCourse } from 'src/app/models/update-course.model';

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
    private courseService: CourseManagementService
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
      }
    );
  }

  onSubmit(): void {
    this.courseService.updateCourse(this.courseId, this.course).subscribe(
      (response) => {
        alert('Course updated successfully');
        this.router.navigate(['/course-management']);
      },
      (error) => {
        console.error('Failed to update course', error);
        alert('Failed to update course. Please try again later.');
      }
    );
  }
  
    navigateBack(): void {
        this.router.navigate(['/course-management']);
      }
    
}
