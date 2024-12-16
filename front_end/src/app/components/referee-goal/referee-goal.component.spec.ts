import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeGoalComponent } from './referee-goal.component';

describe('RefereeGoalComponent', () => {
  let component: RefereeGoalComponent;
  let fixture: ComponentFixture<RefereeGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereeGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefereeGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
