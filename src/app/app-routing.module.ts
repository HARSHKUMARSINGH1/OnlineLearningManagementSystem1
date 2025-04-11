import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { AddCourseComponent } from 'src/app/add-course/add-course.component';
import { ListAllQuizComponent } from './components/list-all-quiz/list-all-quiz.component';
import { QuizAttemptComponent } from 'src/app/quiz-attempt/quiz-attempt.component'; // Import the QuizAttemptComponent
import { StudentAnswerComponent } from './components/student-answer/student-answer.component'; // Import StudentAnswerComponent

const routes: Routes = [
  { path: '', redirectTo: '/course-management', pathMatch: 'full' }, // Default route redirect
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'list-all-quizzes', component: ListAllQuizComponent }, // Route for List All Quiz Component
  { path: 'quiz-attempt', component: QuizAttemptComponent }, // Route for QuizAttemptComponent
  { path: 'student-answer', component: StudentAnswerComponent }, // Route for StudentAnswerComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
