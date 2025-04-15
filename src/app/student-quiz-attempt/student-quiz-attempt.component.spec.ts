import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizAttemptComponent } from './student-quiz-attempt.component';

describe('StudentQuizAttemptComponent', () => {
  let component: StudentQuizAttemptComponent;
  let fixture: ComponentFixture<StudentQuizAttemptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentQuizAttemptComponent]
    });
    fixture = TestBed.createComponent(StudentQuizAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
