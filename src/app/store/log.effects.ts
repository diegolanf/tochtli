import { Injectable, isDevMode } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogEffects {
  public logActions$ = createEffect(
    () => {
      return this.actions$.pipe(
        tap((action: Action) => {
          if (isDevMode()) console.debug('Store:', action);
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
