import { TestBed } from '@angular/core/testing';

import { RedCardService } from './red-card.service';

describe('RedCardService', () => {
  let service: RedCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
