import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
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

  // Inject MatSnackBar in the constructor
  constructor(
    private trackStudentService: TrackStudentService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {}

  // Method called when the form is submitted
  trackProgress(): void {
    if (!this.userId) {
      console.warn('UserID is required');
      this.snackBar.open('Please enter a UserID before submitting.', 'Close', {
        duration: 3000,
        verticalPosition: 'top', // Position the snackbar at the top
        horizontalPosition: 'center' // Center it horizontally
      });
      return;
    }

    // Call the service method and subscribe to the observable
    this.trackStudentService.getProgressByUserId(this.userId).subscribe(
      (data: any) => {
        console.log(`Fetched progress data for UserID ${this.userId}:`, data);
        
        if (data && Object.keys(data).length > 0) {
          this.progressData = data;
        } else {
          this.snackBar.open('Entered UserID is incorrect!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      },
      (error: any) => {
        console.error(`Error fetching progress data for UserID ${this.userId}:`, error);
        this.snackBar.open('Entered UserID is incorrect!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    );
  }
}
