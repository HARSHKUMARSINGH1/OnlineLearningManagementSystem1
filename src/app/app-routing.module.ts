import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { AddCourseComponent } from 'src/app/add-course/add-course.component';
import { EnrollmentAndAccessComponent } from './enrollment-and-access/enrollment-and-access.component';
import { EnrollButtonComponent } from './enrollment-and-access/enrollment-and-access.component'; // Corrected import

const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'enrollment-and-access', component: EnrollmentAndAccessComponent },
  { path: 'enroll/:courseId', component: EnrollButtonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
