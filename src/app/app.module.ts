import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule

import { AppComponent } from './app.component';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { CourseManagementService } from './services/course-management.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { TrackStudentProgressComponent } from './track-student-progress/track-student-progress.component';
import { ReportComponent } from './report/report.component';
import { TrackStudentService } from './services/track-student.service';
import { ReportService } from './services/report.service';


// Define routes
const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'track-student-progress', component: TrackStudentProgressComponent},
  { path: 'report', component: ReportComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent,
    AddCourseComponent,
    TrackStudentProgressComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes) // Add RouterModule here
  ],
  providers: [CourseManagementService, TrackStudentService, ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }