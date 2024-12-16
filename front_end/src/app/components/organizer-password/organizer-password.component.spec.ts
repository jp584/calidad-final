import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerPasswordComponent } from './organizer-password.component';

describe('OrganizerPasswordComponent', () => {
  let component: OrganizerPasswordComponent;
  let fixture: ComponentFixture<OrganizerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
