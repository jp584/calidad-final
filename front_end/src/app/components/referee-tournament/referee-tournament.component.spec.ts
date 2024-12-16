import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeTournamentComponent } from './referee-tournament.component';

describe('RefereeTournamentComponent', () => {
  let component: RefereeTournamentComponent;
  let fixture: ComponentFixture<RefereeTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereeTournamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefereeTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
