import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { AddCourseComponent } from 'src/app/add-course/add-course.component';
import { UpdateCourseComponent } from 'src/app/update-course/update-course.component'

const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
