import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Routine, RoutineStep } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { SharedModule } from '@app/shared/shared.module';
import { RxState } from '@rx-angular/state';
import { LetModule } from '@rx-angular/template/let';
import { PushModule } from '@rx-angular/template/push';
import { combineLatest, map, Observable } from 'rxjs';

export interface StepDescriptionComponentState {
  currentStep: string;
  nextStep: string;
  totalSteps: number;
}

@Component({
  selector: 'app-step-description',
  standalone: true,
  imports: [LetModule, PushModule, SharedModule],
  templateUrl: './step-description.component.html',
  styleUrls: ['./step-description.component.scss'],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepDescriptionComponent implements OnInit {
  @HostBinding('class') public class = 'block font-thin p-2';
  @Input() public runner?: Runner;

  public currentStep$: Observable<string> = this.state.select('currentStep');
  public nextStep$: Observable<string> = this.state.select('nextStep');
  public totalSteps$: Observable<number> = this.state.select('totalSteps');

  constructor(private readonly state: RxState<StepDescriptionComponentState>) {}

  ngOnInit(): void {
    if (this.runner) {
      this.state.connect(
        'currentStep',
        combineLatest([this.runner.completed$, this.runner.currentStep$]).pipe(
          map(([completed, routineStep]: [boolean, RoutineStep | undefined]) =>
            completed
              ? 'routine.runner.description.routineCompleted'
              : routineStep
              ? routineStep.name
              : '-'
          )
        )
      );

      this.state.connect(
        'nextStep',
        combineLatest([this.runner.completed$, this.runner.nextStep$]).pipe(
          map(([completed, routineStep]: [boolean, RoutineStep | undefined]) =>
            completed
              ? '-'
              : routineStep
              ? routineStep.name
              : 'routine.runner.description.endOfRoutine'
          )
        )
      );

      this.state.connect(
        'totalSteps',
        this.runner.routine$.pipe(
          map((routine?: Routine) => (routine ? routine.metadata.steps.counter : 0))
        )
      );
    }
  }
}
