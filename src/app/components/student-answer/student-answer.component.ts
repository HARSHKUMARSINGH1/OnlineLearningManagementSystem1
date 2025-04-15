import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // For navigation
import { AnswerService } from 'src/app/services/answer.service';
import { Answer } from 'src/app/models/answer';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

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
  userId: number = 0;

  constructor(private answerService: AnswerService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile(); // Ensure user profile is fetched
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.answerService.getAllQuizzes().subscribe(
      (data) => {
        this.quizzes = data.map((quiz) => ({
          quizID: quiz.quizID,
          title: quiz.title,
          totalMarks: quiz.totalMarks,
          questions: quiz.questionList.split(','), // Split into an array
          courseID: quiz.courseID
        }));
      },
      (error) => {
        this.errorMessage = 'Failed to load quizzes.';
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  showAttemptForm(quizID: number): void {
    this.attemptingQuizId = quizID;
    this.studentAnswer = ''; // Clear previous answer
  }

  submitAnswer(quizID: number): void {
    if (!this.studentAnswer.trim()) {
      alert('Answer cannot be empty!');
      return;
    }

    const answerPayload: Answer = {
      answerID: 0, // Backend generates this
      response: this.studentAnswer, // Student's answer
      marks: 0, // Placeholder value
      quizID: quizID, // Quiz ID
      userID: this.userId // Corrected: Assigning fetched user ID
    };

    console.log('Submitting payload:', answerPayload); 

    this.answerService.submitAnswers(answerPayload).subscribe(
      () => {
        alert('Answer submitted successfully!');
        this.attemptingQuizId = null;
      },
      (error) => {
        console.error('Error submitting answer:', error);
        alert('Failed to submit the answer.');
      }
    );
  }

  fetchAuthId(): string {
    const token = localStorage.getItem('jwtToken');
    let authId = '';

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        authId = decodedToken.sub || ''; // Ensure 'sub' exists
        console.log('Decoded Auth ID:', authId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return authId;
  }

  getUserProfile(): void {
    const authId = this.fetchAuthId();
    
    if (!authId) {
      console.error('Invalid Auth ID received from token.');
      return;
    }

    this.authService.getUserProfile(authId).subscribe(
      (data: any) => {
        this.userId = data?.userId || 0; // Ensuring userId is valid
        console.log('Fetched userId:', this.userId);
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/course-management']);
  }
}
