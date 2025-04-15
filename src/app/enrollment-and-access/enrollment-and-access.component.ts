import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentAndAccessService } from '../services/enrollment-and-access.service';
import { EnrollmentDto } from '../models/enrollment.dto';

@Component({
  selector: 'app-enrollment-and-access',
  templateUrl: './enrollment-and-access.component.html',
  styleUrls: ['./enrollment-and-access.component.css']
})
export class EnrollmentAndAccessComponent implements OnInit {
  enrollments: EnrollmentDto[] = [];
  userId: number = 0;
  errorMessage: string = '';
  courseID: string | undefined;

  constructor(private route: ActivatedRoute, private enrollmentService: EnrollmentAndAccessService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseID = params['courseID'];
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
      }
    );
  }

  onSubmit(): void {
    this.getEnrollmentsByUserId(this.userId);
  }

 
}

// New component for the enroll button
@Component({
  selector: 'app-enroll-button',
  template: `<button (click)="enroll()">Enroll</button>`
})
export class EnrollButtonComponent {
  @Input() courseId!: string; 
  userId: string = 'logged-in-user-id'; 

  constructor(private enrollmentService: EnrollmentAndAccessService) {}
  

  enroll() {
    this.enrollmentService.enroll(this.userId, this.courseId).subscribe(
      (response: any) => {
        alert('Successfully enrolled in course');
      },
      (error: any) => {
        console.error('Error enrolling in course:', error);
        alert('Failed to enroll in course');
      }
    );
  }
}
