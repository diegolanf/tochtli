import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunnerComponent {}
