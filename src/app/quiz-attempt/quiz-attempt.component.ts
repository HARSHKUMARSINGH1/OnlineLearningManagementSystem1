import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.css']
})
export class QuizAttemptComponent implements OnInit {
  
  answers: Answer[] = [];
  errorMessage: string = '';

  constructor(private answerService: AnswerService,private router: Router) {}
  
  ngOnInit(): void {
    this.loadAnswers();
  }

  // Method to load answers
  loadAnswers(): void {
    this.answerService.getAllAnswers().subscribe(
      (data) => {
        this.answers = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load answers.';
        console.error(error);
      }
    );
  }

  // Method to update marks for an answer
  updateMarks(answer: Answer): void {
    this.answerService.updateAnswer(answer.answerID, answer).subscribe(
      () => {
        alert('Marks updated successfully');
      },
      (error) => {
        this.errorMessage = 'Failed to update marks.';
        console.error('Error:', error);
      }
    );
  } 

  goBack(): void {
    this.router.navigate(['/list-all-quiz']); // Redirect to the previous component
  }
}
