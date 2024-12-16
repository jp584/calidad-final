import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerGameComponent } from './organizer-game.component';

describe('OrganizerGameComponent', () => {
  let component: OrganizerGameComponent;
  let fixture: ComponentFixture<OrganizerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
