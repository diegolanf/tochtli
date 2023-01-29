import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Runner } from '@app/core/models/runner';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-runner-timer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, SharedModule],
  templateUrl: './runner-timer.component.html',
  styleUrls: ['./runner-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunnerTimerComponent {
  @Input() public runner?: Runner;
}
