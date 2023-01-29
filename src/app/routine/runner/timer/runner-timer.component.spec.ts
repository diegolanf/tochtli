import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RunnerTimerComponent } from './runner-timer.component';

describe('RunnerTimerComponent', () => {
  let component: RunnerTimerComponent;
  let fixture: ComponentFixture<RunnerTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule, RunnerTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RunnerTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
