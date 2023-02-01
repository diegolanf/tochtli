import { Duration } from 'luxon';
import { map, Observable } from 'rxjs';

import { Activity, ActivityDto, convertDtoToActivity } from './activity';

export interface StepTypeMetadata {
  duration: Duration;
  counter: number;
}

export const getStepTypeMetadata = (steps: RoutineStep[]): StepTypeMetadata => ({
  counter: steps.length,
  duration: steps.reduce(
    (sum: Duration, current: RoutineStep) => sum.plus(current.duration),
    Duration.fromMillis(0)
  ),
});

export interface RoutineMetadata {
  activities: StepTypeMetadata;
  breaks: StepTypeMetadata;
  steps: StepTypeMetadata;
}

export const getRoutineMetadata = (steps: RoutineStep[]): RoutineMetadata => ({
  activities: getStepTypeMetadata(steps.filter((step: RoutineStep) => step.isBreak === false)),
  breaks: getStepTypeMetadata(steps.filter((step: RoutineStep) => step.isBreak === true)),
  steps: getStepTypeMetadata(steps),
});

export interface RoutineDto {
  id: string;
  name: string;
  activities: ActivityDto[];
  globalBreakDuration: number;
}

export interface RoutineStep {
  name: string;
  duration: Duration;
  index: number;
  isBreak: boolean;
  description?: string;
}

export class Routine {
  public id: string;
  public name: string;
  public activities: Activity[];
  public steps: RoutineStep[];
  public metadata: RoutineMetadata;

  constructor(routine: RoutineDto) {
    this.id = routine.id;
    this.name = routine.name;
    this.activities = routine.activities.map(convertDtoToActivity);
    this.steps = this.activities.reduce((acc: RoutineStep[], activity: Activity, index: number) => {
      acc.push({
        name: activity.name,
        duration: activity.duration,
        index,
        isBreak: false,
        description: activity.description,
      });
      if (index !== this.activities.length - 1) {
        const breakDuration =
          activity.customBreakDuration !== undefined
            ? activity.customBreakDuration
            : Duration.fromObject({ seconds: routine.globalBreakDuration });
        if (breakDuration.toMillis() > 0)
          acc.push({
            name: 'routine.model.break',
            duration: breakDuration,
            index,
            isBreak: true,
          });
      }
      return acc;
    }, []);

    this.metadata = getRoutineMetadata(this.steps);
  }

  public get isEmpty(): boolean {
    return this.steps.length === 0;
  }

  public isActive$ = (activeRoutineId$: Observable<string>): Observable<boolean> =>
    activeRoutineId$.pipe(map((activeRoutineId: string) => this.id === activeRoutineId));
}
