import { Pipe, PipeTransform } from '@angular/core';
import { Duration } from 'luxon';

@Pipe({
  name: 'secondsToTime',
  standalone: true,
})
export class SecondsToTimePipe implements PipeTransform {
  public transform(seconds: number | null | undefined): string {
    if (!seconds) return '';
    const duration = Duration.fromObject({ seconds: seconds });
    return duration.toFormat(duration.as('hours') < 1 ? 'mm:ss' : 'hh:mm:ss');
  }
}
