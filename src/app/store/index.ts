import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AppState } from './app-state.model';
import { LogEffects } from './log.effects';
import { runnerLocalStorageSyncReducer, runnerReducer } from './runner/runner.reducer';

export const reducers: ActionReducerMap<AppState> = {
  runner: runnerReducer,
};

export const effects = [LogEffects];

export const metaReducers: MetaReducer<AppState>[] = [runnerLocalStorageSyncReducer];
