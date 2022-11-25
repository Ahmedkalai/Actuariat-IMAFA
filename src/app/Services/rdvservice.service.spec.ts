import { TestBed } from '@angular/core/testing';

import { RDVServiceService } from './rdvservice.service';

describe('RDVServiceService', () => {
  let service: RDVServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RDVServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
