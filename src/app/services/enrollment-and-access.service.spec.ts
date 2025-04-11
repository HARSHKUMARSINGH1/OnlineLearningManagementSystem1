import { TestBed } from '@angular/core/testing';

import { EnrollmentAndAccessService } from './enrollment-and-access.service'; // Correct import

describe('EnrollmentAndAccessService', () => {
  let service: EnrollmentAndAccessService; // Correct type

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentAndAccessService); // Correct injection
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});