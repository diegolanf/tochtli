import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MyRoutines } from '@app/core/constants/my-routines.constants';
import { Routine, RoutineDto } from '@app/core/models/routine';
import { SecondsToTimePipe } from '@app/shared/pipes/seconds-to-time.pipe';
import { SharedModule } from '@app/shared/shared.module';
import { selectRoutineDto, setRotuine } from '@app/store/routine';
import { Store } from '@ngrx/store';
import { PushModule } from '@rx-angular/template/push';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    PushModule,
    SecondsToTimePipe,
    SharedModule,
  ],
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineListComponent {
  @HostBinding('class') public class = 'page-content';

  public readonly activeRoutine$: Observable<RoutineDto | undefined>;
  public readonly routines: Routine[] = MyRoutines.map(
    (routine: RoutineDto) => new Routine(routine)
  );

  constructor(private readonly router: Router, private readonly store: Store) {
    this.activeRoutine$ = this.store.select(selectRoutineDto);
  }

  public selectRoutine(routine: Routine): void {
    this.store.dispatch(setRotuine({ routine: routine.dto }));
    this.router.navigate(['runner']);
  }
}
