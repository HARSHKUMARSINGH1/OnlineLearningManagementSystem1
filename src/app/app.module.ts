import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule

import { AppComponent } from './app.component';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { CourseManagementService } from './services/course-management.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

// Define routes
const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent }, // Add this route
  { path: '', redirectTo: '/course-management', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent,
    AddCourseComponent,
    UpdateCourseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes) // Add RouterModule here
  ],
  providers: [CourseManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
