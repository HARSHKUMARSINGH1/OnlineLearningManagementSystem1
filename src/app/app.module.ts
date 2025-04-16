import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { UpdateCourseComponent } from './update-course/update-course.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CourseManagementComponent } from 'src/app/course-management/course-management.component';
import { CourseManagementService } from './services/course-management.service';
import { AddCourseComponent } from './add-course/add-course.component';

import { EnrollmentAndAccessComponent } from './enrollment-and-access/enrollment-and-access.component';
import { EnrollmentAndAccessService } from './services/enrollment-and-access.service';


const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent }, // Add this route
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  { path: 'enrollments', component: EnrollmentAndAccessComponent },
  { path: '', redirectTo: '/course-management', pathMatch: 'full' },
  
];
import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { ViewProfileComponent } from './user/viewprofile/viewprofile.component';
import { UpdateProfileComponent } from './user/updateprofile/updateprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent,
    AddCourseComponent,
    CourseManagementComponent,
    FooterComponent,
    HeaderComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    UpdateCourseComponent,
    AddCourseComponent,
    EnrollmentAndAccessComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AuthModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule
    
    
  ],

  providers: [
    CourseManagementService,EnrollmentAndAccessService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi: true // Allows multiple interceptors
  }],
    
  bootstrap: [AppComponent]
})
export class AppModule { }

