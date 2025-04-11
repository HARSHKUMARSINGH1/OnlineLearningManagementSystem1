import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { AddCourseComponent } from 'src/app/add-course/add-course.component';
import { TrackStudentProgressComponent } from './track-student-progress/track-student-progress.component';

const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'track-student-progress', component: TrackStudentProgressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }