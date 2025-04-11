import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../models/answer';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.css']
})
export class QuizAttemptComponent implements OnInit {
  answers: Answer[] = [];
  errorMessage: string = '';

  constructor(private answerService: AnswerService) {}

  ngOnInit(): void {
    this.loadAnswers();
  }

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

  deleteAnswer(id: number): void {
    this.answerService.deleteAnswer(id).subscribe(
      () => {
        this.answers = this.answers.filter((answer) => answer.answerID !== id);
      },
      (error) => {
        this.errorMessage = 'Failed to delete answer.';
        console.error(error);
      }
    );
  }
}
