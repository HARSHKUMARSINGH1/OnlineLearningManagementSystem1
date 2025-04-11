import { Component, OnInit } from '@angular/core';
import { AnswerService } from 'src/app/services/answer.service'; // Import the AnswerService
import { ListAllQuiz } from 'src/app/models/list-all-quiz';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-student-answer',
  templateUrl: './student-answer.component.html',
  styleUrls: ['./student-answer.component.css']
})
export class StudentAnswerComponent implements OnInit {
  quizzes: any[] = []; // Use 'any[]' since we're splitting questionList into an array
  answers: Answer[] = [];
  errorMessage: string = '';

  constructor(private answerService: AnswerService) {}

  ngOnInit(): void {
    this.loadQuizzes(); // Load quizzes on initialization
  }

  // Fetch quizzes from the backend using AnswerService
  loadQuizzes(): void {
    this.answerService.getAllQuizzes().subscribe(
      (data) => {
        this.quizzes = data.map((quiz) => ({
          quizID: quiz.quizID,
          title: quiz.title,
          totalMarks: quiz.totalMarks,
          questions: quiz.questionList.split(',') // Split the questionList string into an array
        }));

        // Initialize answers array with quiz IDs
        this.answers = this.quizzes.map((quiz) => ({
          answerID: 0,         // Default ID for new answers
          response: '',        // Empty response
          marks: 0,            // Initialize marks to 0
          quizID: quiz.quizID, // Associate with quiz ID
          userID: 1            // Replace with the logged-in user's ID dynamically
        }));
      },
      (error) => {
        this.errorMessage = 'Failed to load quizzes.';
        console.error(error);
      }
    );
  }

  // Submit answers to the backend using AnswerService
  submitAnswers(): void {
    // Validate answers before sending
    const hasEmptyResponses = this.answers.some(answer => !answer.response.trim());
    if (hasEmptyResponses) {
      alert('Please provide a response for all quizzes.');
      return;
    }

    this.answerService.submitAnswers(this.answers).subscribe(
      () => alert('Answers submitted successfully!'),
      (error) => {
        console.error('Error details:', error.error);
        this.errorMessage = 'Failed to submit answers.';
      }
    );
  }

  // Clear all answers
  clearAnswers(): void {
    this.answers.forEach((answer) => (answer.response = ''));
  }

  // Helpers for getting and setting answers
  getResponse(quizID: number): string {
    const answer = this.answers.find((a) => a.quizID === quizID);
    return answer ? answer.response : '';
  }

  setResponse(quizID: number, value: string): void {
    const answer = this.answers.find((a) => a.quizID === quizID);
    if (answer) {
      answer.response = value;
    }
  }
}
