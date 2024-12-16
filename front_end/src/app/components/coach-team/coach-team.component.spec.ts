import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachTeamComponent } from './coach-team.component';

describe('CoachTeamComponent', () => {
  let component: CoachTeamComponent;
  let fixture: ComponentFixture<CoachTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
