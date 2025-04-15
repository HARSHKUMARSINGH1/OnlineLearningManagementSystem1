import { Component, OnInit } from '@angular/core';
import { TrackStudentService } from '../services/track-student.service';

@Component({
  selector: 'app-track-student-progress',
  templateUrl: './track-student-progress.component.html',
  styleUrls: ['./track-student-progress.component.css']
})
export class TrackStudentProgressComponent implements OnInit {
  // Variable to hold the entered user id
  userId!: number;
  // Variable to store fetched progress data
  progressData: any;

  constructor(private trackStudentService: TrackStudentService) {}

  ngOnInit(): void {}

  // Method called when the form is submitted
  trackProgress(): void {
    if (!this.userId) {
      console.warn('UserID is required');
      return;
    }

    // Call the service method and subscribe to the observable
    this.trackStudentService.getProgressByUserId(this.userId).subscribe(
      (data: any) => {
        console.log(`Fetched progress data for UserID ${this.userId}:`, data);
        this.progressData = data;
      },
      (error: any) => {
        console.error(`Error fetching progress data for UserID ${this.userId}:`, error);
      }
    );
  }

  // Additional logic can be added here if needed
}
