import { TestBed } from '@angular/core/testing';

import { TrackStudentService } from './track-student.service';

describe('TrackStudentService', () => {
  let service: TrackStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
