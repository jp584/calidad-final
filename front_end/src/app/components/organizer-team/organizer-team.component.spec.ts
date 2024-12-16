import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerTeamComponent } from './organizer-team.component';

describe('OrganizerTeamComponent', () => {
  let component: OrganizerTeamComponent;
  let fixture: ComponentFixture<OrganizerTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
