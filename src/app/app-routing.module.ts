import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { AddCourseComponent } from 'src/app/add-course/add-course.component';
import { ListAllQuizComponent } from './components/list-all-quiz/list-all-quiz.component';
import { QuizAttemptComponent } from 'src/app/quiz-attempt/quiz-attempt.component'; // Import the QuizAttemptComponent
import { StudentAnswerComponent } from './components/student-answer/student-answer.component'; // Import StudentAnswerComponent


import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

import { ViewProfileComponent } from './user/viewprofile/viewprofile.component';
import { UpdateProfileComponent } from './user/updateprofile/updateprofile.component';
import { AuthGuard } from './authguard';
import { UpdateCourseComponent } from 'src/app/update-course/update-course.component'
import { StudentQuizAttemptComponent } from './student-quiz-attempt/student-quiz-attempt.component';
import { EnrollmentAndAccessComponent } from './enrollment-and-access/enrollment-and-access.component';

const routes: Routes = [
 // Default route redirect

  { path: 'course-management', component: CourseManagementComponent,canActivate: [AuthGuard] }, // Add your AuthGuard here
  { path: 'add-course', component: AddCourseComponent },
  { path: 'list-all-quiz', component: ListAllQuizComponent },
  { path: 'quiz-attempt', component: QuizAttemptComponent },
  { path: 'student-quiz-attempt/:id', component: StudentQuizAttemptComponent },
  { path: 'student-answer', component: StudentAnswerComponent },

  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path : 'course-management', component: CourseManagementComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'enrollment-and-access', component: EnrollmentAndAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

