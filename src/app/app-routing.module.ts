import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CourseManagementComponent } from './course-management/course-management.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'course-management', component: CourseManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }