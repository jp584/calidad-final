import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachGameComponent } from './coach-game.component';

describe('CoachGameComponent', () => {
  let component: CoachGameComponent;
  let fixture: ComponentFixture<CoachGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
