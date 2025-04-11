import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollmentAndAccessComponent } from './enrollment-and-access.component';
import { EnrollmentAndAccessService } from '../services/enrollment-and-access.service';
import { of } from 'rxjs';

describe('EnrollmentAndAccessComponent', () => {
  let component: EnrollmentAndAccessComponent;
  let fixture: ComponentFixture<EnrollmentAndAccessComponent>;
  let enrollmentService: EnrollmentAndAccessService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentAndAccessComponent ],
      providers: [
        {
          provide: EnrollmentAndAccessService,
          useValue: {
            getAllEnrollments: () => of([]),
            getEnrollmentsByUserId: () => of([]) // Add this to mock the method used in the component
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentAndAccessComponent);
    component = fixture.componentInstance;
    enrollmentService = TestBed.inject(EnrollmentAndAccessService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch enrollments on init', () => {
    spyOn(enrollmentService, 'getEnrollmentsByUserId').and.returnValue(of([]));
    component.ngOnInit();
    expect(enrollmentService.getEnrollmentsByUserId).toHaveBeenCalled();
  });
});