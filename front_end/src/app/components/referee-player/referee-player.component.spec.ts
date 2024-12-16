import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereePlayerComponent } from './referee-player.component';

describe('RefereePlayerComponent', () => {
  let component: RefereePlayerComponent;
  let fixture: ComponentFixture<RefereePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereePlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefereePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
