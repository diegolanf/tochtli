import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunnerStepperComponent } from './runner-stepper.component';

describe('RunnerStepperComponent', () => {
  let component: RunnerStepperComponent;
  let fixture: ComponentFixture<RunnerStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunnerStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RunnerStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
