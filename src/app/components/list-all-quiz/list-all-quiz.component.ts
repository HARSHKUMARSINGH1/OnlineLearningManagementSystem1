import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { QuizService } from 'src/app/services/quiz.service';
import { ListAllQuiz } from 'src/app/models/list-all-quiz';

@Component({
  selector: 'app-list-all-quiz',
  templateUrl: './list-all-quiz.component.html',
  styleUrls: ['./list-all-quiz.component.css']
})
export class ListAllQuizComponent implements OnInit {
  quizzes: ListAllQuiz[] = []; // Holds the list of quizzes fetched from the backend
  feedbackMessage: string = ''; // Property to hold feedback messages
  newQuiz: ListAllQuiz = { // Properly typed property for a new quiz
    quizID: 0,
    title: '',
    questionList: '',
    totalMarks: 0,
    courseID: 0,
    course: undefined
  };
  editingIndex: number | null = null; // Tracks the index of the quiz being edited

  constructor(private quizService: QuizService, private router: Router) {} // Add Router to constructor

  ngOnInit(): void {
    this.getAllQuizzes(); // Fetch quizzes on initialization
  }

  // Fetch all quizzes
  getAllQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data: ListAllQuiz[]) => {
        this.quizzes = data;
        this.feedbackMessage = ''; // Clear feedback on success
      },
      (error) => {
        this.feedbackMessage = 'Error fetching quizzes. Please try again.';
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  // Add a new quiz
  addQuiz(): void {
    if (!this.newQuiz.title || !this.newQuiz.questionList || this.newQuiz.totalMarks <= 0 || this.newQuiz.courseID <= 0) {
      this.feedbackMessage = 'All fields are required and must be valid to add a quiz.';
      return;
    }

    this.quizService.addQuiz(this.newQuiz).subscribe(
      () => {
        this.feedbackMessage = 'Quiz added successfully!';
        this.getAllQuizzes(); // Refresh the quiz list
        this.resetNewQuiz(); // Reset the form
      },
      (error) => {
        this.feedbackMessage = 'Error adding quiz. Please try again.';
        console.error('Error adding quiz:', error);
      }
    );
  }

  // Redirect to a centralized quiz-attempt page
  redirectToQuizAttempt(): void {
    console.log('Redirecting to quiz-attempt...');
    this.router.navigate(['/quiz-attempt']);
  }
  
  // Enable editing mode for a specific quiz
  enableEditing(index: number): void {
    this.editingIndex = index; // Set the index of the quiz being edited
  }

  // Save changes made to the quiz
  saveChanges(quiz: ListAllQuiz): void {
    if (!quiz.title || !quiz.questionList || quiz.totalMarks <= 0 || quiz.courseID <= 0) {
      this.feedbackMessage = 'All fields are required and must be valid.';
      return;
    }

    this.quizService.updateQuiz(quiz.quizID, quiz).subscribe(
      () => {
        this.feedbackMessage = 'Quiz updated successfully!';
        this.editingIndex = null; // Exit editing mode
        this.getAllQuizzes(); // Refresh the quiz list
      },
      (error) => {
        this.feedbackMessage = 'Error updating quiz. Please try again.';
        console.error('Error updating quiz:', error);
      }
    );
  }

  // Cancel editing mode
  cancelEditing(): void {
    this.editingIndex = null; // Exit editing mode without saving
  }

  // Delete a quiz by ID
  deleteQuiz(id: number): void {
    this.quizService.deleteQuiz(id).subscribe(
      () => {
        this.feedbackMessage = 'Quiz deleted successfully!';
        this.quizzes = this.quizzes.filter((quiz) => quiz.quizID !== id); // Remove deleted quiz
      },
      (error) => {
        this.feedbackMessage = 'Error deleting quiz. Please try again.';
        console.error('Error deleting quiz:', error);
      }
    );
  }

  // Reset the new quiz form
  resetNewQuiz(): void {
    this.newQuiz = {
      quizID: 0,
      title: '',
      questionList: '',
      totalMarks: 0,
      courseID: 0,
      course: undefined
    };
  }

  goBack(): void {
    this.router.navigate(['/course-management']); // Navigate back to course management
  }
}
