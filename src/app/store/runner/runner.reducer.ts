import { RoutineDto } from '@app/core/models/routine';
import { AppState } from '@app/store/app-state.model';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as RunnerActions from './runner.actions';
import { RunnerState } from './runner.model';

const initialRoutineState: RunnerState = {};

export const runnerReducer = createReducer(
  initialRoutineState,
  on(
    RunnerActions.setRoutine,
    (state: RunnerState, { routine }: { routine: RoutineDto }): RunnerState => ({
      routine,
      step: undefined,
      countdown: undefined,
    })
  ),
  on(
    RunnerActions.setStep,
    (state: RunnerState, { step }: { step: number }): RunnerState => ({
      ...state,
      step,
    })
  ),
  on(
    RunnerActions.setCountDown,
    (state: RunnerState, { countdown }: { countdown: number }): RunnerState => ({
      ...state,
      countdown,
    })
  ),
  on(
    RunnerActions.resetRunner,
    (state: RunnerState): RunnerState => ({
      ...state,
      step: undefined,
      countdown: undefined,
    })
  )
);

export const runnerLocalStorageSyncReducer = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> =>
  localStorageSync({
    keys: ['runner'],
    rehydrate: true,
    removeOnUndefined: true,
  })(reducer);
