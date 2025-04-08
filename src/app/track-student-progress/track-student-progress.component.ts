import { Component } from '@angular/core';

@Component({
  selector: 'app-track-student-progress',
  templateUrl: './track-student-progress.component.html',
  styleUrls: ['./track-student-progress.component.css']
})
export class TrackStudentProgressComponent {
  progressList = [
    { ProgressID: 101, UserID: 1, CourseID: 202, CompletedLessons: 'Lesson 1, Lesson 2', QuizScores: 85 },
    { ProgressID: 102, UserID: 2, CourseID: 203, CompletedLessons: 'Lesson 3, Lesson 4', QuizScores: 90 },
    { ProgressID: 103, UserID: 3, CourseID: 204, CompletedLessons: 'Lesson 5, Lesson 6', QuizScores: 75 }
  ];

  // Additional logic can be added here if needed
}
