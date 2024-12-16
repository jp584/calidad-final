import { TestBed } from '@angular/core/testing';

import { YellowCardService } from './yellow-card.service';

describe('YellowCardService', () => {
  let service: YellowCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YellowCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
