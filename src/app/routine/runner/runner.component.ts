import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routine, RoutineDto } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { StepInfoComponent } from '@app/routine/runner/step-info/step-info.component';
import { RunnerStepperComponent } from '@app/routine/runner/stepper/runner-stepper.component';
import { RunnerTimerComponent } from '@app/routine/runner/timer/runner-timer.component';
import { SharedModule } from '@app/shared/shared.module';
import { selectRoutineDto } from '@app/store/routine';
import { Store } from '@ngrx/store';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { take } from 'rxjs';

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
  constructor(public readonly runner: Runner, private readonly store: Store) {
    this.store
      .select(selectRoutineDto)
      .pipe(take(1))
      .subscribe((dto?: RoutineDto) => {
        if (dto) this.runner.routine = new Routine(dto);
      });
  }
}
