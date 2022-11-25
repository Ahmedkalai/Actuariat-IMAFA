import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CESimulatorComponent } from './cesimulator.component';

describe('CESimulatorComponent', () => {
  let component: CESimulatorComponent;
  let fixture: ComponentFixture<CESimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CESimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CESimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
