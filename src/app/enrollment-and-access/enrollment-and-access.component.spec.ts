import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollmentComponent } from './enrollment-and-access.component';
import { EnrollmentService } from './enrollment.service';
import { of } from 'rxjs';

describe('EnrollmentComponent', () => {
  let component: EnrollmentComponent;
  let fixture: ComponentFixture<EnrollmentComponent>;
  let enrollmentService: EnrollmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentComponent ],
      providers: [
        {
          provide: EnrollmentService,
          useValue: {
            getAllEnrollments: () => of([])
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentComponent);
    component = fixture.componentInstance;
    enrollmentService = TestBed.inject(EnrollmentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch enrollments on init', () => {
    spyOn(enrollmentService, 'getAllEnrollments').and.returnValue(of([]));
    component.ngOnInit();
    expect(enrollmentService.getAllEnrollments).toHaveBeenCalled();
  });
});