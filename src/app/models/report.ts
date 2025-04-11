// src/app/report/report.model.ts
export class Report {
    progressID!: string;
    userID!: string;
    courseID!: string;
    completedLessons!: number;
    quizScores!: number;
    isEditing!: boolean;// Add this property
  }
  