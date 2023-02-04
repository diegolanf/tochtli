import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RoutineState } from './routine.model';

export const selectRoutine = createFeatureSelector<RoutineState>('routine');

export const selectRoutineDto = createSelector(selectRoutine, (state: RoutineState) => state.dto);
