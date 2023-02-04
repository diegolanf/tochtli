import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { RouteItem } from '@app/core/constants/route.constants';
import { Routine, RoutineDto } from '@app/core/models/routine';
import { Runner } from '@app/core/models/runner';
import { NavigationService } from '@app/core/services/navigation.service';
import { StepInfoComponent } from '@app/routine/runner/step-info/step-info.component';
import { RunnerStepperComponent } from '@app/routine/runner/stepper/runner-stepper.component';
import { RunnerTimerComponent } from '@app/routine/runner/timer/runner-timer.component';
import { BackButtonDirective } from '@app/shared/directives/back-button.directive';
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
    BackButtonDirective,
    LetModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    PushModule,
    RouterModule,
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
  public readonly routinesRoute: string = RouteItem.routines.route;

  constructor(
    private readonly store: Store,
    public readonly navigationService: NavigationService,
    public readonly runner: Runner
  ) {
    this.store
      .select(selectRoutineDto)
      .pipe(take(1))
      .subscribe((dto?: RoutineDto) => {
        if (dto) this.runner.routine = new Routine(dto);
      });
  }
}
