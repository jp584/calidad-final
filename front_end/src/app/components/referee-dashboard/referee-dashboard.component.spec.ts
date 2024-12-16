import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeDashboardComponent } from './referee-dashboard.component';

describe('RefereeDashboardComponent', () => {
  let component: RefereeDashboardComponent;
  let fixture: ComponentFixture<RefereeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefereeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
