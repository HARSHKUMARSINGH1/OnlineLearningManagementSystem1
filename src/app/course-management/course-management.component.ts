import { Component } from '@angular/core';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent {
  userType: string = 'Student'; // Change to 'instructor' for instructor dashboard

  // You can add more logic here if needed
}