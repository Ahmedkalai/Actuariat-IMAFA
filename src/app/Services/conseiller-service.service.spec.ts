import { TestBed } from '@angular/core/testing';

import { ConseillerServiceService } from './conseiller-service.service';

describe('ConseillerServiceService', () => {
  let service: ConseillerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConseillerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
