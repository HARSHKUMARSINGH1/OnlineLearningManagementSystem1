import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { UpdateCourseComponent } from './update-course/update-course.component';

import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { CourseManagementService } from './services/course-management.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { ListAllQuizComponent } from './components/list-all-quiz/list-all-quiz.component';
import { QuizService } from './services/quiz.service';
import { QuizAttemptComponent } from './quiz-attempt/quiz-attempt.component';
import { StudentAnswerComponent } from './components/student-answer/student-answer.component';


import { EnrollmentAndAccessComponent } from './enrollment-and-access/enrollment-and-access.component';
import { EnrollmentAndAccessService } from './services/enrollment-and-access.service';


// Import MatSnackBarModule
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule

import { TrackStudentProgressComponent } from './track-student-progress/track-student-progress.component';
import { ReportComponent } from './report/report.component';
import { TrackStudentService } from './services/track-student.service';
import { ReportService } from './services/report.service';
import { MatSnackBarModule } from '@angular/material/snack-bar'

const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent }, // Add this route
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'enrollments', component: EnrollmentAndAccessComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  
  { path: 'update-course/:id', component: UpdateCourseComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'update-course/:id', component: UpdateCourseComponent }, // Add this route
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'track-student-progress', component: TrackStudentProgressComponent},
  { path: 'report', component: ReportComponent}
];

import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { ViewProfileComponent } from './user/viewprofile/viewprofile.component';
import { UpdateProfileComponent } from './user/updateprofile/updateprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { StudentQuizAttemptComponent } from './student-quiz-attempt/student-quiz-attempt.component';





@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent,
    AddCourseComponent,
    ListAllQuizComponent,
    QuizAttemptComponent,
    StudentAnswerComponent,
    CourseManagementComponent,
    FooterComponent,
    HeaderComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    UpdateCourseComponent,
    StudentQuizAttemptComponent,
    EnrollmentAndAccessComponent,
    UpdateCourseComponent,
    AddCourseComponent,
    TrackStudentProgressComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AuthModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
    
    
  

    
    
  
  providers: [
    
    
    CourseManagementService,EnrollmentAndAccessService,TrackStudentService, QuizService, ReportService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi: true // Allows multiple interceptors
  }],
    
  
    // Add RouterModule her
  bootstrap: [AppComponent]
})
export class AppModule { }

