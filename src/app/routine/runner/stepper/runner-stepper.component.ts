import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { RoutineStep } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { RxEffects } from '@rx-angular/state/effects';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';

@Component({
  selector: 'app-runner-stepper',
  standalone: true,
  imports: [CommonModule, LetModule, MatIconModule, MatStepperModule, PushModule],
  templateUrl: './runner-stepper.component.html',
  styleUrls: ['./runner-stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    RxEffects,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunnerStepperComponent implements AfterViewInit {
  @Input() public runner?: Runner;
  @ViewChild('stepper') public stepper?: MatStepper;

  constructor(private readonly effects: RxEffects) {}

  ngAfterViewInit(): void {
    if (this.runner) {
      this.effects.register(this.runner.currentStep$, (step: RoutineStep | undefined) => {
        const actitivityIndex = step?.index ?? 0;
        if (this.stepper && actitivityIndex <= this.stepper.steps.length - 1)
          this.stepper.selectedIndex = actitivityIndex;
      });

      this.effects.register(this.runner.initialState$, (initialState: boolean) => {
        if (initialState) {
          this.stepper?.reset();
        }
      });
    }
  }
}
