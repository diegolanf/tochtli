import { RoutineDto } from '@app/core/models/routine';
import { createAction, props } from '@ngrx/store';

export const setRotuine = createAction('[Routine] Set', props<{ routine: RoutineDto }>());
