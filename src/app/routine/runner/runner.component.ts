import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routine } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { MockRoutineDto } from '@app/core/models/test/routine.mock';
import { StepInfoComponent } from '@app/routine/runner/step-info/step-info.component';
import { RunnerStepperComponent } from '@app/routine/runner/stepper/runner-stepper.component';
import { RunnerTimerComponent } from '@app/routine/runner/timer/runner-timer.component';
import { SharedModule } from '@app/shared/shared.module';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [
    LetModule,
    MatProgressBarModule,
    PushModule,
    RunnerStepperComponent,
    RunnerTimerComponent,
    SharedModule,
    StepInfoComponent,
  ],
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
