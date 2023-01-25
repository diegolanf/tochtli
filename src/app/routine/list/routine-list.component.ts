import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineListComponent {}
