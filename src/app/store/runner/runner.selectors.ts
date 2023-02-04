import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RunnerState } from './runner.model';

export const selectRunner = createFeatureSelector<RunnerState>('runner');

export const selectRunnerRoutine = createSelector(
  selectRunner,
  (state: RunnerState) => state.routine
);

export const selectRunnerStep = createSelector(selectRunner, (state: RunnerState) => state.step);

export const selectRunnerCountdown = createSelector(
  selectRunner,
  (state: RunnerState) => state.countdown
);
