import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerUserComponent } from './organizer-user.component';

describe('OrganizerUserComponent', () => {
  let component: OrganizerUserComponent;
  let fixture: ComponentFixture<OrganizerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
