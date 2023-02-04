import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Routine, RoutineStep } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { SecondsToTimePipe } from '@app/shared/pipes/seconds-to-time.pipe';
import { SharedModule } from '@app/shared/shared.module';
import { RxState } from '@rx-angular/state';
import { PushModule } from '@rx-angular/template/push';
import { map, Observable, of, switchMap } from 'rxjs';

export interface RunnerTimerComponentState {
  isBreak: boolean;
  isEmpty: boolean;
  spinnerValue: number;
}

@Component({
  selector: 'app-runner-timer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PushModule,
    SecondsToTimePipe,
    SharedModule,
  ],
  templateUrl: './runner-timer.component.html',
  styleUrls: ['./runner-timer.component.scss'],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunnerTimerComponent implements OnInit {
  @HostBinding('class') public class = 'block h-fit w-fit';

  @Input() public runner?: Runner;

  public readonly isBreak$: Observable<boolean> = this.state.select('isBreak');
  public readonly isEmpty$: Observable<boolean> = this.state.select('isEmpty');
  public readonly spinnerValue$: Observable<number> = this.state.select('spinnerValue');

  constructor(private readonly state: RxState<RunnerTimerComponentState>) {}

  ngOnInit(): void {
    if (this.runner) {
      this.state.connect(
        'isBreak',
        this.runner.currentStep$.pipe(map((step?: RoutineStep) => step?.isBreak ?? false))
      );

      this.state.connect(
        'isEmpty',
        this.runner.routine$.pipe(map((routine: Routine) => routine.isEmpty))
      );

      this.state.connect(
        'spinnerValue',
        this.runner.currentStep$.pipe(
          switchMap(
            (step?: RoutineStep) =>
              this.runner?.countdown$.pipe(
                map(
                  (countdown: number) =>
                    (countdown * 100) / (step ? step.duration.as('seconds') : 1)
                )
              ) ?? of(0)
          )
        )
      );
    }
  }
}
