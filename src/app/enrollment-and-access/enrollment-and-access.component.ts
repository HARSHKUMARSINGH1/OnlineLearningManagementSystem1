import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentDto } from './enrollment.dto';

@Component({
  selector: 'app-enrollment-and-access',
  templateUrl: './enrollment-and-access.component.html',
  styleUrls: ['./enrollment-and-access.component.css']
})
export class EnrollmentAndAccessComponent implements OnInit {
  enrollments: EnrollmentDto[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.getAllEnrollments();
  }

  getAllEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe(
      (data: EnrollmentDto[]) => {
        this.enrollments = data;
      },
      (error) => {
        console.error('Error fetching enrollments', error);
      }
    );
  }
}