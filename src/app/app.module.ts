import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { CourseManagementService } from './services/course-management.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { ListAllQuizComponent } from './components/list-all-quiz/list-all-quiz.component';
import { QuizService } from './services/quiz.service';
import { QuizAttemptComponent } from './quiz-attempt/quiz-attempt.component';
import { StudentAnswerComponent } from './components/student-answer/student-answer.component';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent,
    AddCourseComponent,
    ListAllQuizComponent,
    QuizAttemptComponent,
    StudentAnswerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    AppRoutingModule // Use AppRoutingModule to handle routes
  ],
  providers: [CourseManagementService, QuizService],
  bootstrap: [AppComponent]
})
export class AppModule {}
