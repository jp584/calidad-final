import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerDssComponent } from './organizer-dss.component';

describe('OrganizerDssComponent', () => {
  let component: OrganizerDssComponent;
  let fixture: ComponentFixture<OrganizerDssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerDssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerDssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
