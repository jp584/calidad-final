import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPlayerComponent } from './coach-player.component';

describe('CoachPlayerComponent', () => {
  let component: CoachPlayerComponent;
  let fixture: ComponentFixture<CoachPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
