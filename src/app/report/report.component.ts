import { Component, OnInit } from '@angular/core';
import { Report } from '../models/report';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.reportService.getReports().subscribe(
      (data: Report[]) => {
        this.reports = data;
      },
      (error : any) => {
        console.error('Error fetching report data', error);
        // Optionally, show an error message to the user here.
      }
    );
  }

 // Enable edit mode for a specific row
 editItem(index: number): void {
  this.reports[index].isEditing = true; // Set edit mode
}

saveItem(index: number): void {
  const updatedItem = {
    ...this.reports[index], // Keep original values for other fields
    completedLessons: this.reports[index].completedLessons, // Updated value
    quizScores: this.reports[index].quizScores // Updated value
  };

  this.reports[index] = updatedItem; // Update the specific item in the reports array
  this.reports[index].isEditing = false; // Exit edit mode
  console.log('Updated item:', this.reports[index]);

  // Optionally, send updated data to the backend via an API call
  this.reportService.updateReport(updatedItem).subscribe(
    () => {
      console.log('Report updated successfully');
    },
    error => {
      console.error('Error updating report:', error);
    }
  );
}



}
