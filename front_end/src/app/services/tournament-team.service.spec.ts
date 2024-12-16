import { TestBed } from '@angular/core/testing';

import { TournamentTeamService } from './tournament-team.service';

describe('TournamentTeamService', () => {
  let service: TournamentTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
