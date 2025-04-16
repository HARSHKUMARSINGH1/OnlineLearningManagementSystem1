import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { EnrollmentAndAccessService } from '../services/enrollment-and-access.service';
import { EnrollmentDto } from '../models/enrollment.dto';
import { ICourse } from '../models/course-model';

@Component({
  selector: 'app-enrollment-and-access',
  templateUrl: './enrollment-and-access.component.html',
  styleUrls: ['./enrollment-and-access.component.css']
})
export class EnrollmentAndAccessComponent implements OnInit {
  enrollments: EnrollmentDto[] = [];
  userId: number = 0;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enrollmentService: EnrollmentAndAccessService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId']; // Ensure userId is correctly parsed as a number
      this.fetchEnrollments();
    });
  }

  getEnrollmentsByUserId(userId: number): void {
    this.enrollmentService.getEnrollmentsByUserId(userId).subscribe(
      (data: EnrollmentDto[]) => {
        this.enrollments = data;
        this.errorMessage = '';
      },
      (error: any) => {
        console.error('Error fetching enrollments', error);
        this.errorMessage = 'Error fetching enrollments. Please try again.';
        this.snackBar.open('Error fetching enrollments. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  fetchEnrollments(): void {
    this.getEnrollmentsByUserId(this.userId);
  }

  addEnrollment(course: ICourse): void {
    this.enrollmentService.isUserEnrolled(course.courseID, this.userId.toString()).subscribe(
      (isEnrolled: boolean) => {
        if (isEnrolled) {
          this.snackBar.open('You are already enrolled in this course!', 'Close', {
            duration: 3000,
          });
        } else {
          const enrollment: EnrollmentDto = {
            enrollmentID: 0, // Assuming 0 for new enrollment, adjust as needed
            courseID: course.courseID,
            title: course.title,
            userID: this.userId,
            enrollmentDate: new Date()
          };

          this.enrollmentService.addEnrollment(enrollment).subscribe(
            (response) => {
              this.snackBar.open('Successfully enrolled in course', 'Close', {
                duration: 3000,
              });
              this.fetchEnrollments(); // Refresh the enrollments list
            },
            (error) => {
              console.error('Error adding enrollment:', error);
              this.snackBar.open('Failed to enroll in course', 'Close', {
                duration: 3000,
              });
            }
          );
        }
      },
      (error: any) => {
        console.error('Error checking enrollment status:', error);
        this.snackBar.open('Failed to check enrollment status', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
}
