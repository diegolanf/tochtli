import { RoutineDto } from '@app/core/models/routine';
import { AppState } from '@app/store/app-state.model';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as RoutineActions from './routine.actions';
import { RoutineState } from './routine.model';

const initialRoutineState: RoutineState = {
  dto: undefined,
};

export const routineReducer = createReducer(
  initialRoutineState,
  on(
    RoutineActions.setRotuine,
    (state: RoutineState, { routine }: { routine: RoutineDto }): RoutineState => ({
      ...state,
      dto: routine,
    })
  )
);

export const routineLocalStorageSyncReducer = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> =>
  localStorageSync({
    keys: ['routine'],
    rehydrate: true,
    removeOnUndefined: true,
  })(reducer);
