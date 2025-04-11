import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { AddCourseComponent } from 'src/app/add-course/add-course.component';
import { UpdateCourseComponent } from 'src/app/update-course/update-course.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { ViewProfileComponent } from './user/viewprofile/viewprofile.component';
import { UpdateProfileComponent } from './user/updateprofile/updateprofile.component';

const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'update-course/:courseID', component: UpdateCourseComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' }
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path : 'course-management', component: CourseManagementComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'update-profile', component: UpdateProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
