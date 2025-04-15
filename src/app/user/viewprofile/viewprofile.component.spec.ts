import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileComponent } from './viewprofile.component';

describe('ViewprofileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfileComponent]
    });
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
