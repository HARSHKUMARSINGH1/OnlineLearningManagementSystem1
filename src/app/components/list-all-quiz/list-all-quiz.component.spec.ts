import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllQuizComponent } from './list-all-quiz.component';

describe('ListAllQuizComponent', () => {
  let component: ListAllQuizComponent;
  let fixture: ComponentFixture<ListAllQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllQuizComponent]
    });
    fixture = TestBed.createComponent(ListAllQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
