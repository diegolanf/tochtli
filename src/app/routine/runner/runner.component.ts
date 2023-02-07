import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { RouteItem } from '@app/core/constants/route.constants';
import { Routine } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { NavigationService } from '@app/core/services/navigation.service';
import { StepInfoComponent } from '@app/routine/runner/step-info/step-info.component';
import { RunnerStepperComponent } from '@app/routine/runner/stepper/runner-stepper.component';
import { RunnerTimerComponent } from '@app/routine/runner/timer/runner-timer.component';
import { BackButtonDirective } from '@app/shared';
import { RunnerState, selectRunner, setCountdown, setStep } from '@app/store/runner';
import { TranslocoModule } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { RxEffects } from '@rx-angular/state/effects';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { take } from 'rxjs';

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [
    BackButtonDirective,
    CommonModule,
    LetModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    PushModule,
    RouterModule,
    RunnerStepperComponent,
    RunnerTimerComponent,
    StepInfoComponent,
    TranslocoModule,
  ],
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss'],
  providers: [Runner, RxEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunnerComponent {
  public readonly routinesRoute: string = RouteItem.routines.route;

  constructor(
    private readonly store: Store,
    private readonly effects: RxEffects,
    public readonly navigationService: NavigationService,
    public readonly runner: Runner
  ) {
    this.effects.register(
      this.store.select(selectRunner).pipe(take(1)),
      (runnerState: RunnerState) => {
        if (runnerState.routine) {
          this.runner.routine = new Routine(runnerState.routine);
          if (runnerState.step) this.runner.jumpToStep(runnerState.step);
          if (runnerState.countdown) this.runner.setCountdown(runnerState.countdown);
        }
      }
    );

    this.effects.register(this.runner.currentStepIndex$, (step: number) =>
      this.store.dispatch(setStep({ step }))
    );

    this.effects.register(this.runner.countdown$, (countdown: number) =>
      this.store.dispatch(setCountdown({ countdown }))
    );
  }
}
