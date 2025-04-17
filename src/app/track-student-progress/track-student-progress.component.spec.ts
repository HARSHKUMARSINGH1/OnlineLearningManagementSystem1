import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStudentProgressComponent } from './track-student-progress.component';

describe('TrackStudentProgressComponent', () => {
  let component: TrackStudentProgressComponent;
  let fixture: ComponentFixture<TrackStudentProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackStudentProgressComponent]
    });
    fixture = TestBed.createComponent(TrackStudentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
