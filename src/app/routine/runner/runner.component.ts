import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Routine } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { MockRoutineDto } from '@app/core/models/test/routine.mock';
import { StepDescriptionComponent } from '@app/routine/runner/step-description/step-description.component';
import { RunnerStepperComponent } from '@app/routine/runner/stepper/runner-stepper.component';
import { RunnerTimerComponent } from '@app/routine/runner/timer/runner-timer.component';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [RunnerStepperComponent, RunnerTimerComponent, SharedModule, StepDescriptionComponent],
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss'],
  providers: [Runner],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunnerComponent {
  constructor(public readonly runner: Runner) {
    this.runner.routine = new Routine(MockRoutineDto);
  }
}
