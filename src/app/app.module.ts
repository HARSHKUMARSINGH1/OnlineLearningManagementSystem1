import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackStudentProgressComponent } from './track-student-progress/track-student-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackStudentProgressComponent // Ensure this component is declared
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
