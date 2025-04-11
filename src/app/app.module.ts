import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { CourseManagementService } from './services/course-management.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { EnrollmentAndAccessComponent } from './enrollment-and-access/enrollment-and-access.component';
import { EnrollmentAndAccessService } from './services/enrollment-and-access.service';
import { EnrollButtonComponent } from './enrollment-and-access/enrollment-and-access.component'; // Corrected import


const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'enrollments', component: EnrollmentAndAccessComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  
  { path: 'enroll/:courseId', component: EnrollButtonComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent,
    AddCourseComponent,
    EnrollmentAndAccessComponent,
    
    EnrollButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  providers: [CourseManagementService, EnrollmentAndAccessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
