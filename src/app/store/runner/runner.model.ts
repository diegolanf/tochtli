import { RoutineDto } from '@app/core/models/routine';

export interface RunnerState {
  routine?: RoutineDto;
  step?: number;
  countdown?: number;
}
