import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachDssComponent } from './coach-dss.component';

describe('CoachDssComponent', () => {
  let component: CoachDssComponent;
  let fixture: ComponentFixture<CoachDssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachDssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachDssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
