import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TrackStudentProgressComponent } from './track-student-progress/track-student-progress.component';
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'track-student-progress', component: TrackStudentProgressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }