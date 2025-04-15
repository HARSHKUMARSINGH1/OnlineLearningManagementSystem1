import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // For navigation
import { AnswerService } from 'src/app/services/answer.service';
import { Answer } from 'src/app/models/answer';


@Component({
  selector: 'app-student-answer',
  templateUrl: './student-answer.component.html',
  styleUrls: ['./student-answer.component.css']
})
export class StudentAnswerComponent implements OnInit {
  quizzes: any[] = []; // List of quizzes
  errorMessage: string = ''; // Error message
  attemptingQuizId: number | null = null; // ID of the quiz being attempted
  studentAnswer: string = ''; // Student's answer for the quiz

  constructor(private answerService: AnswerService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  // Fetch quizzes from the backend
  loadQuizzes(): void {
    this.answerService.getAllQuizzes().subscribe(
      (data) => {
        this.quizzes = data.map((quiz) => ({
          quizID: quiz.quizID,
          title: quiz.title,
          totalMarks: quiz.totalMarks,
          questions: quiz.questionList.split(',') // Split into an array
        }));
      },
      (error) => {
        this.errorMessage = 'Failed to load quizzes.';
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  // Show the attempt form for the selected quiz
  showAttemptForm(quizID: number): void {
    this.attemptingQuizId = quizID;
    this.studentAnswer = ''; // Clear any previous answer
  }

  submitAnswer(quizID: number): void {
    if (!this.studentAnswer.trim()) {
      alert('Answer cannot be empty!');
      return;
    }
  
    // Prepare the payload
    const answerPayload: Answer = {
      answerID: 0, // Assuming the backend generates this automatically
      response: this.studentAnswer, // The student's answer
      marks: 0, // Placeholder value (can be calculated later)
      quizID: quizID, // The ID of the quiz being attempted
      userID: 1// Replace with the actual logged-in user's ID
    };
  
    console.log('Submitting payload:', answerPayload); // Log for debugging
  
    this.answerService.submitAnswers(answerPayload).subscribe(
      () => {
        alert('Answer submitted successfully!');
        this.attemptingQuizId = null; // Reset the form state
      },
      (error) => {
        console.error('Error submitting answer:', error);
        alert('Failed to submit the answer. Please check the console for details.');
      }
    );
  }  
}
