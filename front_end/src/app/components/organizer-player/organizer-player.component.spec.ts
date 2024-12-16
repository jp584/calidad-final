import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerPlayerComponent } from './organizer-player.component';

describe('OrganizerPlayerComponent', () => {
  let component: OrganizerPlayerComponent;
  let fixture: ComponentFixture<OrganizerPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
