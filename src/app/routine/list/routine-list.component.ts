import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MyRoutines } from '@app/core/constants/my-routines.constants';
import { Routine, RoutineDto } from '@app/core/models/routine';
import { SecondsToTimePipe } from '@app/shared';
import { selectRunnerRoutine, setRoutine } from '@app/store/runner';
import { TranslocoModule } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { RxState } from '@rx-angular/state';
import { PushModule } from '@rx-angular/template/push';
import { Observable } from 'rxjs';

export interface RoutineListComponentState {
  activeRoutine?: RoutineDto;
}

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    PushModule,
    SecondsToTimePipe,
    TranslocoModule,
  ],
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.scss'],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineListComponent {
  @HostBinding('class') public class = 'page-content';

  public readonly activeRoutine$: Observable<RoutineDto | undefined>;
  public readonly routines: Routine[] = MyRoutines.map(
    (routine: RoutineDto) => new Routine(routine)
  );

  constructor(
    private readonly router: Router,
    private readonly state: RxState<RoutineListComponentState>,
    private readonly store: Store
  ) {
    this.state.connect('activeRoutine', this.store.select(selectRunnerRoutine));
    this.activeRoutine$ = this.state.select('activeRoutine');
  }

  public selectRoutine(routine: Routine): void {
    const activeRoutine = this.state.get('activeRoutine');
    if (routine.id !== activeRoutine?.id) {
      this.store.dispatch(setRoutine({ routine: routine.dto }));
    }

    this.router.navigate(['runner']);
  }
}
