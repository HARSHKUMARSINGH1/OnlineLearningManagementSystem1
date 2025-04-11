import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseManagementService } from 'src/app/services/course-management.service';
import { UpdateCourse } from 'src/app/models/update-course.model';
import { ICourse } from 'src/app/models/course-model'; // Assuming you have an ICourse model

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  userType: string = 'Instructor'; // Set to 'Instructor'
  updateCourseData: UpdateCourse = {
    title: '',
    description: '',
    syllabus: '',
    instructorID: 0,
    preRequisites: ''
  };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseID = Number(this.route.snapshot.paramMap.get('courseID'));
    if (courseID) {
      this.loadCourseDetails(courseID);
    }
  }

  loadCourseDetails(courseID: number): void {
    this.courseService.getCourseById(courseID).subscribe(
      (data) => {
        this.updateCourseData = {
          title: data.title,
          description: data.description,
          syllabus: data.syllabus,
          instructorID: data.instructorID,
          preRequisites: data.preRequisites
        };
      },
      (error) => {
        this.errorMessage = 'Failed to load course details. Please try again later.';
      }
    );
  }

  updateCourse(): void {
    const courseID = Number(this.route.snapshot.paramMap.get('courseID'));
    if (courseID) {
      this.courseService.updateCourse(courseID, this.updateCourseData).subscribe(
        (response) => {
          alert('Course updated successfully');
          this.router.navigate(['/course-management']);
        },
        (error) => {
          alert('Failed to update course. Please try again later.');
        }
      );
    }
  }
}
