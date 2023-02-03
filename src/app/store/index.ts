import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AppState } from './app-state.model';
import { routineLocalStorageSyncReducer, routineReducer } from './routine/routine.reducer';

export const reducers: ActionReducerMap<AppState> = {
  routine: routineReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [routineLocalStorageSyncReducer];
