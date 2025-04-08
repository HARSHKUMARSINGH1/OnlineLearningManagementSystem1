import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { EnrollmentAndAccessComponent } from './enrollment-and-access/enrollment-and-access.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent,
    EnrollmentAndAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
