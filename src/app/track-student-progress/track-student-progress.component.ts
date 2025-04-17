import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackStudentService } from '../services/track-student.service';

@Component({
  selector: 'app-track-student-progress',
  templateUrl: './track-student-progress.component.html',
  styleUrls: ['./track-student-progress.component.css']
})
export class TrackStudentProgressComponent implements OnInit {
  userId!: number;
  progressData: any[] = [];

  constructor(
    private trackStudentService: TrackStudentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  trackProgress(): void {
    if (!this.userId) {
      console.warn('UserID is required');
      this.snackBar.open('Please enter a UserID before submitting.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }

    this.trackStudentService.getProgressByUserId(this.userId).subscribe(
      (data: any) => {
        console.log(`Fetched progress data for UserID ${this.userId}:`, data);
        
        if (data && Object.keys(data).length > 0) {
          this.progressData = Array.isArray(data) ? data : [data];
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
