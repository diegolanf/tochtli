import { RoutineDto } from '@app/core/models/routine';
import { createAction, props } from '@ngrx/store';

export const setRoutine = createAction('[Runner] Set routine', props<{ routine: RoutineDto }>());

export const resetRunner = createAction('[Runner] Reset');

export const setStep = createAction('[Runner] Set step', props<{ step: number }>());

export const setCountdown = createAction('[Runner] Set countdown', props<{ countdown: number }>());
