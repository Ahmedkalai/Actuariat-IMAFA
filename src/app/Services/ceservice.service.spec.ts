import { TestBed } from '@angular/core/testing';

import { CEServiceService } from './ceservice.service';

describe('CEServiceService', () => {
  let service: CEServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CEServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
