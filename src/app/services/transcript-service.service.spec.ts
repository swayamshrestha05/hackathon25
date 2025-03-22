import { TestBed } from '@angular/core/testing';

import { TranscriptServiceService } from './transcript-service.service';

describe('TranscriptServiceService', () => {
  let service: TranscriptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
